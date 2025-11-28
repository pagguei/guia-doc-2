'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
    Page, Footer, FootGrid, FootBrand, FootSmall, FootLinks, LegalFoot
} from '../page.styles';

/* ========= Tokens locais (alinhados com a home) ========= */
const space = (n: number) => `${n * 4}px`;
const color = {
    text: '#0b0c0f',
    muted: 'rgba(0,0,0,.62)',
    border: 'rgba(0,0,0,.10)',
    brand: 'hsl(220 90% 56%)',
    brandSoft: 'hsl(220 95% 56% / .12)',
};
const mq = { sm: '@media (max-width: 720px)' };

export default function RefundPage() {
    return (
        <Page>
            <PageHeader>
                <HeaderInner>
                    <Eyebrow>Atendimento ao consumidor</Eyebrow>
                    <H1>Política de Devolução & Reembolso</H1>
                    <Updated>Última atualização: 11/09/2025</Updated>
                </HeaderInner>
            </PageHeader>

            <Article>
                <Section id="arrependimento">
                    <H2>Direito de arrependimento (7 dias)</H2>
                    <P>
                        Para compras online, você pode desistir em até <strong>7 (sete) dias corridos</strong> a partir da contratação, com reembolso integral dos
                        valores pagos pelo serviço de assessoria, conforme art. 49 do Código de Defesa do Consumidor.
                    </P>
                </Section>

                <Divider />

                <Section id="como-solicitar">
                    <H2>Como solicitar</H2>
                    <OL>
                        <li>
                            Envie e-mail para <a href="mailto:reembolso@guiadodocumento.com.br">reembolso@guiadodocumento.com.br</a> com:
                            número do pedido, nome completo e CPF.
                        </li>
                        <li>Se possível, informe o motivo (opcional, para melhoria contínua).</li>
                        <li>Processaremos em até <strong>7 dias úteis</strong> após a confirmação.</li>
                    </OL>
                </Section>

                <Divider />

                <Section id="condicoes">
                    <H2>Condições</H2>
                    <UL>
                        <LI>Reembolso incide apenas sobre os honorários de assessoria.</LI>
                        <LI><strong>Taxas oficiais</strong> pagas a órgãos públicos não são reembolsadas por nós.</LI>
                        <LI>Para pagamentos via cartão/terceiros, o estorno segue as regras do respectivo meio de pagamento.</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="prazo-forma">
                    <H2>Prazo e forma de reembolso</H2>
                    <P>
                        O reembolso será efetuado pelo mesmo método de pagamento utilizado, sempre que possível. Prazos bancários e de bandeiras/cartões podem
                        variar.
                    </P>
                </Section>

                <Divider />

                <Section id="suporte">
                    <H2>Suporte</H2>
                    <P>
                        Dúvidas? Contate <a href="mailto:suporte@guiadodocumento.com.br">suporte@guiadodocumento.com.br</a>.
                    </P>
                </Section>
            </Article>

            <Footer>
                <FootGrid>
                    <div>
                        <FootBrand>Guia do Documento</FootBrand>
                        <FootSmall>Assessoria documental privada. Não somos órgão governamental.</FootSmall>
                    </div>
                    <FootLinks>
                        <li><Link href="/termos">Termos & Condições</Link></li>
                        <li><Link href="/privacidade">Privacidade</Link></li>
                        <li><Link href="/reembolso">Política de Devolução</Link></li>
                    </FootLinks>
                </FootGrid>
                <LegalFoot>
                    <span>Este serviço é opcional e independente dos órgãos públicos.</span>
                </LegalFoot>
            </Footer>
        </Page>
    );
}

/* =========================
   Styles locais da página
========================= */

const PageHeader = styled.header`
  background:
    radial-gradient(1200px 500px at 20% -10%, hsl(220 90% 96%), transparent 60%),
    linear-gradient(180deg, #fff, #f8fbff 70%, #f7faff);
  border-bottom: 1px solid ${color.border};
`;

const HeaderInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${space(10)} ${space(4)} ${space(6)};
  ${mq.sm} { padding: ${space(8)} ${space(4)} ${space(4)}; }
`;

const Eyebrow = styled.span`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 10px; border-radius: 999px;
  font-size: 12.5px; font-weight: 800;
  color: ${color.brand}; background: ${color.brandSoft};
  border: 1px solid ${color.border};
`;

const H1 = styled.h1`
  margin: ${space(2)} 0 6px;
  font-size: clamp(28px, 4.8vw, 36px);
  font-weight: 900;
  letter-spacing: -0.01em;
`;

const Updated = styled.p`
  margin: 0; color: ${color.muted}; font-size: 14px;
`;

const Article = styled.article`
  max-width: 880px;
  margin: 0 auto;
  padding: ${space(8)} ${space(4)} ${space(12)};
  color: ${color.text};
`;

const Section = styled.section`
  scroll-margin-top: 84px; /* caso use header fixo */
`;

const H2 = styled.h2`
  font-size: 20px;
  margin: 0 0 ${space(1.5)};
  font-weight: 900;
`;

const P = styled.p`
  margin: 0;
  color: ${color.muted};
  line-height: 1.7;
  font-size: 15px;
`;

const UL = styled.ul`
  margin: 0;
  padding-left: 0;
  display: grid;
  gap: 8px;
`;

const LI = styled.li`
  list-style: none;
  position: relative;
  padding-left: 22px;
  color: ${color.muted};
  line-height: 1.7;
  font-size: 15px;

  &::before{
    content: '';
    position: absolute; left: 0; top: .68em;
    width: 8px; height: 8px; border-radius: 999px;
    background: ${color.brand};
    box-shadow: 0 0 0 4px ${color.brandSoft};
  }
`;

const OL = styled.ol`
  margin: 0;
  padding-left: 20px;
  display: grid; gap: 8px;
  color: ${color.muted};
  li { line-height: 1.7; font-size: 15px; }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${color.border};
  margin: ${space(6)} 0;
`;
