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

export default function PrivacyPage() {
    return (
        <Page>
            <PageHeader>
                <HeaderInner>
                    <Eyebrow>Privacidade</Eyebrow>
                    <H1>Política de Privacidade</H1>
                    <Updated>Última atualização: 11/09/2025</Updated>
                </HeaderInner>
            </PageHeader>

            <Article>
                <Section id="visao-geral">
                    <H2>Visão geral</H2>
                    <P>
                        Esta política descreve como coletamos, usamos e protegemos os dados pessoais fornecidos no contexto do serviço de assessoria opcional
                        prestado pelo <strong>Guia do Documento</strong>.
                    </P>
                </Section>

                <Divider />

                <Section id="dados-que-coletamos">
                    <H2>Dados que coletamos</H2>
                    <UL>
                        <LI>Dados de identificação e contato (ex.: nome, e-mail, telefone).</LI>
                        <LI>Dados necessários ao guia (ex.: informações de passaporte, viagem, etc.).</LI>
                        <LI>Dados de navegação (cookies técnicos, analytics com IP anonimizado quando aplicável).</LI>
                        <LI>Dados de pagamento (processados por parceiros; não armazenamos dados sensíveis de cartão).</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="finalidades">
                    <H2>Finalidades</H2>
                    <UL>
                        <LI>Prestar a consultoria e gerar seu guia passo a passo.</LI>
                        <LI>Atendimento e comunicação sobre seu pedido.</LI>
                        <LI>Cumprir obrigações legais e fiscais.</LI>
                        <LI>Melhorar o site e prevenir fraudes/abusos.</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="compartilhamento">
                    <H2>Compartilhamento</H2>
                    <P>
                        Podemos compartilhar dados com provedores estritamente necessários (ex.: meios de pagamento, hospedagem, ferramentas de suporte).
                        Não vendemos seus dados.
                    </P>
                </Section>

                <Divider />

                <Section id="seguranca">
                    <H2>Segurança</H2>
                    <P>
                        Adotamos medidas técnicas e organizacionais proporcionais ao serviço para proteger informações contra acessos não autorizados.
                    </P>
                </Section>

                <Divider />

                <Section id="direitos">
                    <H2>Seus direitos</H2>
                    <UL>
                        <LI>Acessar, corrigir ou excluir dados pessoais, conforme legislação aplicável.</LI>
                        <LI>Revogar consentimentos não obrigatórios a qualquer tempo.</LI>
                        <LI>Solicitar informações sobre o tratamento de dados.</LI>
                    </UL>
                </Section>

                <Divider />

                <Section id="cookies">
                    <H2>Cookies</H2>
                    <P>
                        Utilizamos cookies necessários ao funcionamento do site e, quando aplicável, cookies de análise com IP anonimizado.
                    </P>
                </Section>

                <Divider />

                <Section id="base-legal">
                    <H2>Base legal</H2>
                    <P>
                        Tratamos dados para execução de contrato (prestação do serviço), cumprimento de obrigações legais e, quando cabível, legítimo
                        interesse e/ou consentimento.
                    </P>
                </Section>

                <Divider />

                <Section id="controlador">
                    <H2>Contato do controlador</H2>
                    <P>
                        E-mail: <a href="mailto:privacidade@guiadodocumento.com.br">privacidade@guiadodocumento.com.br</a><br />
                        Razão social / CNPJ: <em>preencher</em>
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
