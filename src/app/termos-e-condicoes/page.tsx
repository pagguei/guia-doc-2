'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
    Page, Footer, FootGrid, FootBrand, FootSmall, FootLinks, LegalFoot
} from '../page.styles';

/* ========= Tokens locais (alinhados com a home) ========= */
const space = (n: number) => `${n * 4}px`;
const radius = { md: '12px', lg: '16px' };
const shadow = { sm: '0 1px 3px rgba(0,0,0,.08)' };
const color = {
    text: '#0b0c0f',
    muted: 'rgba(0,0,0,.62)',
    border: 'rgba(0,0,0,.10)',
    borderStrong: 'rgba(0,0,0,.16)',
    brand: 'hsl(220 90% 56%)',
    brandSoft: 'hsl(220 95% 56% / .12)',
    grayBg: 'hsl(215 20% 96%)',
};
const mq = { sm: '@media (max-width: 720px)' };

export default function TermsPage() {
    return (
        <Page>
            <PageHeader>
                <HeaderInner>
                    <Eyebrow>Documentos legais</Eyebrow>
                    <H1>Termos & Condições</H1>
                    <Updated>Última atualização: 11/09/2025</Updated>
                </HeaderInner>
            </PageHeader>

            <Article>
                <Section id="quem-somos">
                    <H2>Quem somos</H2>
                    <P>
                        <strong>Guia do Documento</strong> é uma empresa privada que presta serviço de <strong>assessoria opcional</strong>
                        e orientação para solicitação de documentos oficiais (ex.: passaporte). <strong>Não somos órgão governamental</strong>,
                        tampouco representamos Polícia Federal, Ministério da Justiça, Ministério das Relações Exteriores ou quaisquer entes públicos.
                    </P>
                </Section>

                <Divider />

                <Section id="objeto-do-servico">
                    <H2>Objeto do serviço</H2>
                    <P>
                        Oferecemos guia de preenchimento, checklist de documentos e suporte informativo para que você realize sua solicitação nos canais
                        oficiais. A emissão de documentos é exclusiva dos órgãos públicos competentes. Nossos honorários referem-se apenas à consultoria;
                        <strong> taxas oficiais</strong> eventualmente cobradas pelos órgãos públicos não estão incluídas.
                    </P>
                </Section>

                <Divider />

                <Section id="elegibilidade-veracidade">
                    <H2>Elegibilidade e veracidade</H2>
                    <UL>
                        <LI>Você declara ser maior de 18 anos ou estar autorizado por responsável legal.</LI>
                        <LI>Você se compromete a fornecer informações verdadeiras, completas e atualizadas.</LI>
                        <LI>Reservamo-nos o direito de recusar/encerrar o atendimento em caso de fraude, abuso ou descumprimento destes termos.</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="pagamentos-e-notas">
                    <H2>Pagamentos e notas</H2>
                    <UL>
                        <LI>O pagamento refere-se ao serviço de assessoria. Não inclui taxas de órgãos públicos.</LI>
                        <LI>Emitimos comprovante/nota conforme legislação aplicável. Dados fiscais poderão ser solicitados.</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="reembolsos-arrependimento">
                    <H2>Reembolsos e arrependimento</H2>
                    <P>
                        Em compras online, você possui <strong>direito de arrependimento em até 7 (sete) dias corridos</strong> a partir da contratação, nos termos do
                        Código de Defesa do Consumidor (art. 49). Consulte a nossa <A href="/reembolso">Política de Devolução</A> para prazos e procedimentos.
                    </P>
                </Section>

                <Divider />

                <Section id="privacidade">
                    <H2>Privacidade e proteção de dados</H2>
                    <P>
                        Tratamos dados pessoais conforme a <A href="/privacidade">Política de Privacidade</A>. Utilizamos medidas técnicas e organizacionais
                        compatíveis com o serviço prestado para proteger suas informações.
                    </P>
                </Section>

                <Divider />

                <Section id="propriedade-intelectual">
                    <H2>Propriedade intelectual</H2>
                    <P>
                        Textos, guias, marcas e layout do site são de nossa titularidade ou licenciados. É vedada a reprodução não autorizada.
                    </P>
                </Section>

                <Divider />

                <Section id="limitacao-de-responsabilidade">
                    <H2>Limitação de responsabilidade</H2>
                    <P>
                        Envidamos esforços para manter as informações atualizadas, mas não garantimos ausência de erros/indisponibilidades. Não respondemos por
                        decisões dos órgãos públicos, filas, prazos, recusas de emissão, indisponibilidades sistêmicas ou fatos fora de nosso controle.
                    </P>
                </Section>

                <Divider />

                <Section id="contato">
                    <H2>Contato</H2>
                    <P>
                        E-mail: <a href="mailto:suporte@guiadodocumento.com.br">suporte@guiadodocumento.com.br</a><br />
                        Razão social / CNPJ: <em>preencher seus dados</em><br />
                        Endereço: <em>preencher</em>
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
                    <span>Lei nº 14.282/2021 – atividade de despachante documentalista.</span>
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

const A = styled(Link)`
  color: ${color.brand};
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover { opacity: .9; }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px hsl(220 90% 56% / .25); }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${color.border};
  margin: ${space(6)} 0;
`;
