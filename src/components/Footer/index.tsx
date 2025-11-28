'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import {
    Brand,
    BrandText,
    ColTitle,
    FootCol,
    FooterWrap,
    FootGrid,
    FootTop,
    LegalFoot,
    LinkItem,
    LinkList,
    NewsButton,
    NewsForm,
    NewsInput,
    Newsletter,
    SocialLink,
    Socials,
    TrustBadge,
    TrustRow,
} from './styles';

export default function Footer() {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <FooterWrap aria-labelledby="site-footer">
            {/* Barra superior com CTA */}
            <FootTop>
                <p>
                    Precisa de ajuda para iniciar? &nbsp;
                    <Link href="/contato">Fale com um especialista</Link>
                </p>
                <button
                    data-open-cookie-manager
                    onClick={() => window.dispatchEvent(new Event('cookie-consent:open'))}
                >
                    Gerenciar Cookies
                </button>
            </FootTop>

            {/* Grid principal */}
            <FootGrid id="site-footer">
                {/* Coluna 1: Marca + selos */}
                <FootCol>
                    <Brand>
                        <Image
                            src="/logo-guia.png"
                            alt="Guia do Documento"
                            width={132}
                            height={76}
                            priority
                        />
                    </Brand>
                    <BrandText>
                        Assessoria documental privada. Não somos órgão governamental.
                    </BrandText>

                    <TrustRow aria-label="Selos de confiança">
                        <TrustBadge title="Conexão protegida por SSL">
                            {/* 🔒 SSL 256 */}
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                                <path
                                    d="M17 11V8a5 5 0 10-10 0v3M6 11h12v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>SSL 256-bit</span>
                        </TrustBadge>

                        <TrustBadge title="Pagamentos via PIX">
                            {/* PIX */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#ffffffff" fillRule="evenodd" d="M19.777 8.738c.361.361.693.693.948.994c.275.323.546.706.705 1.194a3.47 3.47 0 0 1 0 2.147c-.159.489-.43.872-.705 1.195c-.255.3-.587.633-.948.994l-4.515 4.515a18 18 0 0 1-.994.948c-.323.275-.707.546-1.195.705a3.48 3.48 0 0 1-2.147 0c-.488-.159-.87-.43-1.195-.705c-.3-.255-.632-.587-.993-.948l-4.515-4.515a18 18 0 0 1-.948-.994c-.275-.323-.546-.706-.705-1.195a3.47 3.47 0 0 1 0-2.147c.159-.488.43-.87.705-1.194c.254-.3.586-.633.948-.994l4.515-4.515c.361-.361.693-.693.993-.948c.324-.275.707-.546 1.195-.705a3.47 3.47 0 0 1 2.147 0c.489.159.872.43 1.195.705c.3.255.632.586.994.948zm-2.343-.237l1.253 1.253c.787.786 1.18 1.18 1.327 1.633c.13.398.13.828 0 1.226c-.147.454-.54.847-1.327 1.633l-1.253 1.253h-1.513a.8.8 0 0 1-.598-.28l-1.946-2.14a1.86 1.86 0 0 0-2.754 0l-1.947 2.14a.8.8 0 0 1-.597.28H6.565l-1.253-1.253c-.786-.786-1.179-1.18-1.326-1.633a2 2 0 0 1 0-1.226c.147-.454.54-.847 1.326-1.633l1.253-1.253H8.08c.209 0 .426.09.597.28l1.947 2.14a1.86 1.86 0 0 0 2.754 0l1.946-2.14a.8.8 0 0 1 .598-.28zm-1.489-1.489h-.024c-.652 0-1.262.286-1.7.767L12.276 9.92a.37.37 0 0 1-.55 0L9.778 7.78a2.3 2.3 0 0 0-1.7-.768h-.024l1.7-1.7c.786-.786 1.18-1.179 1.632-1.326c.4-.13.829-.13 1.227 0c.454.147.847.54 1.633 1.327zm-.024 9.976h.024l-1.7 1.7c-.785.786-1.178 1.179-1.632 1.326c-.398.13-.828.13-1.227 0c-.453-.147-.846-.54-1.632-1.327l-1.7-1.7h.025c.652 0 1.261-.285 1.699-.766l1.947-2.141a.37.37 0 0 1 .55 0l1.947 2.14a2.3 2.3 0 0 0 1.7.768" clipRule="evenodd" /></svg>
                            <span>PIX</span>
                        </TrustBadge>

                        <TrustBadge title="Proteção de dados do usuário">
                            {/* Escudo / privacy */}
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                                <path
                                    d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Dados protegidos</span>
                        </TrustBadge>
                    </TrustRow>

                    <Socials aria-label="Redes sociais">
                        <SocialLink href="https://instagram.com" target="_blank" rel="noopener">
                            {/* Instagram */}
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                                <circle cx="17.5" cy="6.5" r="1.2" />
                            </svg>
                        </SocialLink>
                        <SocialLink href="https://x.com" target="_blank" rel="noopener">
                            {/* X/Twitter */}
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                                <path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </SocialLink>
                        <SocialLink href="mailto:contato@guiadodocumento.com.br">
                            {/* Email */}
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                                <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                            </svg>
                        </SocialLink>
                    </Socials>
                </FootCol>

                {/* Coluna 2: Institucional */}
                <FootCol>
                    <ColTitle>Institucional</ColTitle>
                    <LinkList>
                        <LinkItem><Link href="/">Início</Link></LinkItem>
                        <LinkItem><Link href="/sobre">Sobre nós</Link></LinkItem>
                        <LinkItem><Link href="/contato">Contato</Link></LinkItem>
                        <LinkItem><Link href="/faq">Perguntas frequentes</Link></LinkItem>
                    </LinkList>
                </FootCol>

                {/* Coluna 3: Serviços */}
                <FootCol>
                    <ColTitle>Serviços</ColTitle>
                    <LinkList>
                        <LinkItem><Link href="/primeira-via">Guia de Passaporte – 1ª via</Link></LinkItem>
                        <LinkItem><Link href="/renovacao">Guia de Passaporte – Renovação</Link></LinkItem>
                        <LinkItem><Link href="/consultoria">Consultoria documental</Link></LinkItem>
                    </LinkList>
                </FootCol>

                {/* Coluna 4: Newsletter */}
                <FootCol>
                    <ColTitle>Receba novidades</ColTitle>
                    <Newsletter>
                        <p>Alertas úteis e orientações sobre documentação. Sem spam.</p>
                        <NewsForm action="/api/newsletter" method="post">
                            <NewsInput
                                type="email"
                                name="email"
                                placeholder="Seu e-mail"
                                aria-label="Seu e-mail"
                                required
                            />
                            <NewsButton type="submit">Assinar</NewsButton>
                        </NewsForm>
                        <small>Ao assinar, você concorda com nossa <Link href="/privacidade">Política de Privacidade</Link>.</small>
                    </Newsletter>
                </FootCol>
            </FootGrid>

            {/* Legal */}
            <LegalFoot>
                <span>Lei nº 14.282/2021 — regulamenta a profissão de despachante documentalista.</span>
                <span>Instrução Normativa PF nº 173/2020 — normas do passaporte comum e outros documentos de viagem.</span>
                <span>© {year} Guia do Documento. Todos os direitos reservados.</span>
            </LegalFoot>
        </FooterWrap>
    );
}
