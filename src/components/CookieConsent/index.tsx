
'use client';
// Adiciona declaração global para a propriedade __openCookieManager
declare global {
    interface Window {
        __openCookieManager?: boolean;
    }
}

import * as Dialog from '@radix-ui/react-dialog';
import { CookieIcon, CubeIcon, GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import router from 'next/router';
import * as React from 'react';
import {
    AcceptAllBtn,
    BannerActions,
    BannerDescription,
    BannerHeader,
    BannerInner,
    BannerText,
    BannerTitle,
    BannerWrap,
    CloseX,
    DialogContent,
    DialogDesc,
    DialogFooter,
    DialogHeader, // ícones/bolinhas simples
    DialogOverlay,
    DialogSection,
    DialogTitle,
    Divider,
    FooterNote,
    ManageRow,
    Overlay,
    SaveBtn,
    SectionText,
    SectionTitle,
    SwitchLabel,
    SwitchRoot,
    SwitchRow,
    SwitchThumb,
    WrapIcon
} from './styles';

/** ===== Tipos & Constantes ===== */
type Consent = {
    essential: true;
    functional: boolean;
    analytics: boolean;
    timestamp: string;   // ISO
    version: string;     // para upgrades futuros
};

const STORAGE_KEY = 'cookie-consent-v1';
const CONSENT_VERSION = '1.0.0';

type CookieCtx = {
    consent: Consent | null;
    setConsent: (c: Consent) => void;
    openManager: () => void;
    consentReady: boolean;
};

const CookieContext = React.createContext<CookieCtx | undefined>(undefined);
export const useCookieConsent = () => {
    const ctx = React.useContext(CookieContext);
    if (!ctx) throw new Error('useCookieConsent deve ser usado dentro de <CookieConsentProvider/>');
    return ctx;
};

/** ===== Provider (banner + dialog) ===== */
export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsentState] = React.useState<Consent | null>(null);
    const [ready, setReady] = React.useState(false);
    const [showBanner, setShowBanner] = React.useState(false);
    const [managerOpen, setManagerOpen] = React.useState(false);

    // Carregar do storage no client
    React.useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed: Consent = JSON.parse(raw);
                // se você versionar categorias, dá para invalidar abaixo:
                if (parsed.version !== CONSENT_VERSION) {
                    setShowBanner(true);
                } else {
                    setConsentState(parsed);
                }
            } else {
                setShowBanner(true);
            }
        } catch {
            setShowBanner(true);
        } finally {
            setReady(true);
        }
    }, []);

    const persist = React.useCallback((c: Omit<Consent, 'timestamp' | 'version'>) => {
        const next: Consent = { ...c, timestamp: new Date().toISOString(), version: CONSENT_VERSION };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setConsentState(next);
        // atributo para CSS/Tag Manager e evento para listeners
        document.documentElement.setAttribute('data-consent-functional', String(next.functional));
        document.documentElement.setAttribute('data-consent-analytics', String(next.analytics));
        window.dispatchEvent(new CustomEvent('cookie-consent:updated', { detail: next }));
    }, []);

    const acceptAll = () => {
        persist({ essential: true, functional: true, analytics: true });
        setShowBanner(false);
        setManagerOpen(false);
    };

    const onlyEssential = () => {
        persist({ essential: true, functional: false, analytics: false });
        setShowBanner(false);
        setManagerOpen(false);
    };

    const savePrefs = (f: boolean, a: boolean) => {
        persist({ essential: true, functional: f, analytics: a });
        setShowBanner(false);
        setManagerOpen(false);
    };

    const openManager = () => setManagerOpen(true);

    const ctxValue = React.useMemo<CookieCtx>(() => ({
        consent, setConsent: persist, openManager, consentReady: ready,
    }), [consent, persist, ready]);

    // Estado local dos switches no manager
    const [funcOn, setFuncOn] = React.useState(false);
    const [anaOn, setAnaOn] = React.useState(false);

    React.useEffect(() => {
        if (consent) {
            setFuncOn(consent.functional);
            setAnaOn(consent.analytics);
        }
    }, [consent, managerOpen]);

    React.useEffect(() => {
        function handleOpenManager() {
            setManagerOpen(true);
        }
        window.addEventListener('cookie-consent:open', handleOpenManager);
        return () => {
            window.removeEventListener('cookie-consent:open', handleOpenManager);
        };
    }, []);

    return (
        <CookieContext.Provider value={ctxValue}>
            {children}

            {/* Banner */}
            {ready && showBanner && (
                <>
                    <Overlay />

                    <BannerWrap role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-desc">
                        <BannerInner>
                            <BannerHeader>
                                <WrapIcon>
                                    <CookieIcon style={{ width: 28, height: 28, color: '#2563eb' }} />
                                </WrapIcon>
                                <div>
                                    <BannerTitle id="cookie-banner-title">Política de Cookies</BannerTitle>
                                    <BannerDescription>Respeitamos sua privacidade e seguimos a LGPD.</BannerDescription>
                                </div>
                            </BannerHeader>
                            <BannerText id="cookie-banner-desc">
                                Utilizamos cookies para melhorar sua experiência, personalizar conteúdos, analisar o tráfego e garantir o funcionamento adequado do site.
                                <br />
                                <br />
                                <strong>Cookies essenciais</strong> são necessários para o funcionamento básico do site e não podem ser desativados. <strong> Cookies opcionais</strong> podem ser gerenciados por você.
                                <br />
                                <br />

                                Ao continuar navegando, você concorda com nossa política de cookies e tratamento de dados conforme nossa Política de Privacidade.
                            </BannerText>

                            <BannerActions>
                                <SaveBtn onClick={acceptAll} aria-label="Aceitar todos os cookies">Aceitar Todos</SaveBtn>
                                <AcceptAllBtn onClick={onlyEssential} aria-label="Permitir apenas cookies essenciais">Apenas Essenciais</AcceptAllBtn>
                            </BannerActions>

                            <ManageRow>
                                <AcceptAllBtn onClick={() => setManagerOpen(true)}>
                                    <GearIcon />  Gerenciar Cookies
                                </AcceptAllBtn>
                                <SaveBtn onClick={() => router.push('/politica-de-privacidade')}>
                                    <CubeIcon /> Política de Privacidade
                                </SaveBtn>
                            </ManageRow>

                            <FooterNote>
                                Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e Marco Civil da Internet.
                            </FooterNote>
                        </BannerInner>
                    </BannerWrap>
                </>
            )}

            {/* Dialog de gerenciamento */}
            <Dialog.Root open={managerOpen} onOpenChange={setManagerOpen}>
                <Dialog.Portal>
                    <DialogOverlay />
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Gerenciar Cookies</DialogTitle>
                            <DialogDesc>Escolha quais tipos de cookies deseja permitir.</DialogDesc>
                            <Dialog.Close asChild>
                                <CloseX aria-label="Fechar">✕</CloseX>
                            </Dialog.Close>
                        </DialogHeader>

                        {/* Essenciais */}
                        <DialogSection>
                            <SectionTitle>Cookies Essenciais</SectionTitle>
                            <SectionText>
                                Sempre ativos. Necessários para o funcionamento básico do site (login, carrinho, segurança, acessibilidade).
                                <br />
                                <em>Base legal:</em> Legítimo interesse (Art. 7º, IX da LGPD).
                            </SectionText>
                            <SwitchRow disabled>
                                <SwitchLabel>Sempre ativos</SwitchLabel>
                                <SwitchRoot checked disabled aria-readonly id="switch-essential">
                                    <SwitchThumb />
                                </SwitchRoot>
                            </SwitchRow>

                        </DialogSection>

                        <Divider />

                        {/* Funcionais */}
                        <DialogSection>
                            <SectionTitle>Cookies Funcionais</SectionTitle>
                            <SectionText>
                                Melhoram a experiência (preferências, formulários, aparência, histórico de navegação).
                                <br />
                                <em>Base legal:</em> Consentimento (Art. 7º, I da LGPD).
                            </SectionText>
                            <SwitchRow>
                                <SwitchLabel>Permitir</SwitchLabel>
                                <SwitchRoot
                                    checked={funcOn}
                                    onCheckedChange={setFuncOn}
                                    id="switch-functional"
                                >
                                    <SwitchThumb />
                                </SwitchRoot>
                            </SwitchRow>

                        </DialogSection>

                        <Divider />

                        {/* Análise */}
                        <DialogSection>
                            <SectionTitle>Cookies de Análise</SectionTitle>
                            <SectionText>
                                Nos ajudam a melhorar: páginas mais visitadas, tempo de permanência, origem do tráfego e relatórios de desempenho.
                                <br />
                                <em>Base legal:</em> Consentimento (Art. 7º, I da LGPD).<br /> <em>Retenção:</em> dados anonimizados por até 2 anos.
                            </SectionText>
                            <SwitchRow>
                                <SwitchLabel>Permitir</SwitchLabel>
                                <SwitchRoot
                                    checked={anaOn}
                                    onCheckedChange={setAnaOn}
                                    id="switch-analytics"
                                >
                                    <SwitchThumb />
                                </SwitchRoot>
                            </SwitchRow>

                        </DialogSection>

                        <DialogFooter>
                            <SaveBtn onClick={() => savePrefs(funcOn, anaOn)}>Salvar Preferências</SaveBtn>
                            <AcceptAllBtn onClick={acceptAll}>Aceitar Todos</AcceptAllBtn>
                        </DialogFooter>

                        <FooterNote>
                            Você pode alterar suas preferências a qualquer momento.<br /> Mais informações em nossa{' '}
                            <Link href="/politica-de-privacidade" target="_blank">Política de Privacidade</Link>.
                        </FooterNote>
                    </DialogContent>
                </Dialog.Portal>
            </Dialog.Root>
        </CookieContext.Provider>
    );
}

/** ===== ConsentGate =====
 * Use para renderizar scripts/trechos apenas com consentimento.
 * Ex.: <ConsentGate category="analytics"><GA4Script/></ConsentGate>
 */
export function ConsentGate({ category, children }: {
    category: 'functional' | 'analytics';
    children: React.ReactNode;
}) {
    const { consent, consentReady } = useCookieConsent();
    if (!consentReady) return null;
    if (consent?.[category]) return <>{children}</>;
    return null;
}

// Listener para abrir via evento (útil em botões do header/footer)
if (typeof window !== 'undefined') {
    window.addEventListener('cookie-consent:open', () => {
        console.log('[CookieConsent] Evento recebido: cookie-consent:open');
        const btn = document.querySelector<HTMLButtonElement>('[data-open-cookie-manager]');
        if (btn) {
            btn.click();
        } else {
            // fallback: abrir direto
            (window as any).__openCookieManager = true;
        }
    });
    // fallback: se __openCookieManager for true, abrir o manager
    setTimeout(() => {
        if (window.__openCookieManager) {
            document.dispatchEvent(new Event('cookie-consent:open-fallback'));
        }
    }, 500);
}
