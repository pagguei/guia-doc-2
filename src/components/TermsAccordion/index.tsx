'use client';

import * as React from 'react';

import {
    CheckCircledIcon,
    ExclamationTriangleIcon,
    FileTextIcon,
    GlobeIcon,
    InfoCircledIcon,

} from '@radix-ui/react-icons';

import {
    Container,
    SmallMeta,
    Root,
    Item,
    Trigger,
    Content,
    ContentInner,
    Section,
    H3,
    P,
    UL,
    OL,
    LI,
    A,
    CalloutWrap,
    CalloutIcon,
    CalloutBody,
    CalloutTitle,
} from './styles';
import PrivacyContent from './privacy-content';

type Props = {
    value: '' | 'terms' | 'privacy';
    onValueChange: (v: '' | 'terms' | 'privacy') => void;
    lastUpdate?: string; // opcional, padrão abaixo
};

const BRAND = 'Guia do Documento';
const CONTACT = 'contato@guiadodocumento.com.br';
const DEFAULT_UPDATE = '10/09/2025';

/* ---- Callout ---- */
type Variant = 'info' | 'warning' | 'success';
function Callout({
    variant,
    title,
    children,
}: {
    variant: Variant;
    title?: React.ReactNode;
    children?: React.ReactNode;
}) {
    const Icon =
        variant === 'warning'
            ? ExclamationTriangleIcon
            : variant === 'success'
                ? CheckCircledIcon
                : InfoCircledIcon;

    return (
        <CalloutWrap $variant={variant} role="status" aria-live="polite">
            <CalloutIcon $variant={variant}>
                <Icon />
            </CalloutIcon>
            <CalloutBody>
                {title && <CalloutTitle>{title}</CalloutTitle>}
                <div>{children}</div>
            </CalloutBody>
        </CalloutWrap>
    );
}

export function TermsAccordion({
    value,
    onValueChange,
    lastUpdate = DEFAULT_UPDATE,
}: Props) {
    return (
        <Container id="terms-accordion">
            <SmallMeta>Última atualização: {lastUpdate}</SmallMeta>

            <Root
                type="single"
                collapsible
                value={value}
                onValueChange={(v) => onValueChange((v as any) || '')}
            >
                {/* ===== Termos de Uso ===== */}
                <Item value="terms">
                    {/* Trigger sem setinhas (caret removido nos estilos) */}
                    <Trigger><FileTextIcon /> Termos de Uso</Trigger>

                    {/* Content com altura fixa e rolagem interna */}
                    <Content>
                        <ContentInner>
                            <Section>
                                <H3>1. Quem somos</H3>
                                <P>
                                    O <strong>{BRAND}</strong> é um serviço privado e independente,{' '}
                                    <strong>sem qualquer vínculo, filiação, endosso ou representação de órgãos governamentais</strong>{' '}
                                    (ex.: Polícia Federal, Detran, Cartórios, Itamaraty). Prestamos{' '}
                                    <strong>assessoria online</strong> e fornecemos um{' '}
                                    <strong>guia personalizado de orientações</strong> para que o próprio usuário execute,
                                    por conta própria, os procedimentos oficiais (ex.: emissão/renovação de passaporte).
                                </P>

                                <Callout variant="warning" title="Importante">
                                    Não realizamos emissão de documentos, não garantimos vagas de agendamento
                                    e não integramos sistemas governamentais. Nosso serviço é exclusivamente informativo
                                    e de orientação.
                                </Callout>

                                <P>
                                    Contato oficial: <A href={`mailto:${CONTACT}`}>{CONTACT}</A>.
                                </P>
                            </Section>

                            <Section>
                                <H3>2. Objeto e natureza do serviço</H3>
                                <UL>
                                    <LI>Não emitimos documentos e não intermediamos agendamentos oficiais.</LI>
                                    <LI>
                                        Entregamos conteúdos orientativos (passo a passo, checklists, alertas de documentos, prazos,
                                        taxas e <i>links</i> oficiais) e, quando contratado, suporte para dúvidas gerais.
                                    </LI>
                                    <LI>
                                        O serviço é <strong>opcional</strong>: o usuário pode realizar tudo diretamente nos canais oficiais,
                                        sem nossa intervenção.
                                    </LI>
                                </UL>

                                <Callout variant="info" title="Dica">
                                    Antes de iniciar, tenha em mãos seus documentos e verifique as exigências atualizadas
                                    nos canais oficiais. Nosso guia sempre indica os <i>links</i> de referência.
                                </Callout>
                            </Section>

                            <Section>
                                <H3>3. Base legal para a prestação do serviço</H3>
                                <P>Nosso serviço é lícito, com fundamento em:</P>
                                <UL>
                                    <LI>
                                        <strong>Constituição Federal</strong>, art. 5º, XIII – livre exercício de trabalho, ofício ou profissão;
                                    </LI>
                                    <LI><strong>Código Civil</strong>, arts. 593–609 – contratos de prestação de serviços;</LI>
                                    <LI><strong>CDC – Código de Defesa do Consumidor (Lei 8.078/1990)</strong>;</LI>
                                    <LI><strong>Decreto 7.962/2013</strong> (Comércio Eletrônico – transparência);</LI>
                                    <LI><strong>Marco Civil da Internet (Lei 12.965/2014)</strong> e <strong>LGPD (Lei 13.709/2018)</strong>.</LI>
                                </UL>
                            </Section>

                            <Section>
                                <H3>4. Aceite dos Termos</H3>
                                <P>
                                    Ao usar a plataforma e concluir uma compra, você declara que leu e concorda com estes Termos.
                                    Se não concordar, não utilize o serviço.
                                </P>
                            </Section>

                            <Section>
                                <H3>5. Cadastro, comunicações e e-mail válido</H3>
                                <P>
                                    Para contratar, informe dados verdadeiros, especialmente um <strong>e-mail válido</strong>.
                                    Todas as orientações, acessos, recibos e comunicações serão enviados para o e-mail cadastrado.
                                </P>

                                <Callout variant="success" title="Atenção ao e-mail">
                                    Garanta que você tem acesso ao e-mail informado e verifique caixa de spam/lixo eletrônico.
                                    É por lá que você receberá o guia e eventuais atualizações.
                                </Callout>
                            </Section>

                            <Section>
                                <H3>6. Entrega do serviço</H3>
                                <OL>
                                    <LI>Após confirmação de pagamento, coletamos informações necessárias.</LI>
                                    <LI>
                                        Disponibilizamos o <strong>guia personalizado</strong> com instruções, links oficiais e checklist.
                                    </LI>
                                    <LI>Suporte (se incluso no plano) é prestado em dias úteis e horário comercial.</LI>
                                    <LI>
                                        Informações oficiais (taxas, endereços, regras) podem mudar sem aviso. Atualizamos
                                        materiais de forma razoável ao identificarmos alterações.
                                    </LI>
                                </OL>
                            </Section>

                            <Section>
                                <H3>7. Ausência de vínculo e limitações</H3>
                                <P>
                                    Não garantimos agendamento imediato, disponibilidade de vagas, aceitação de documentos
                                    ou emissão/renovação de passaporte; tais atos dependem dos órgãos competentes e do
                                    cumprimento de requisitos pelo usuário.
                                </P>
                            </Section>

                            <Section>
                                <H3>8. Preços, pagamento e notas</H3>
                                <UL>
                                    <LI>Preços e planos são exibidos antes da contratação.</LI>
                                    <LI>Pagamentos são processados por terceiros (gateways).</LI>
                                    <LI>Chargebacks podem gerar suspensão do acesso. Emitimos recibos conforme a lei.</LI>
                                </UL>
                            </Section>

                            <Section>
                                <H3>9. Direito de arrependimento e política de reembolso</H3>
                                <P>
                                    Em compras online, o <strong>CDC (art. 49)</strong> assegura arrependimento em{' '}
                                    <strong>até 7 (sete) dias</strong> a contar do recebimento/ativação do serviço.
                                </P>

                                <Callout variant="success" title="Reembolso integral">
                                    Se você solicitar arrependimento dentro de 7 dias e o serviço <strong>não tiver sido utilizado/entregue</strong>
                                    (ex.: guia ainda não disponibilizado; assessoria não iniciada), o reembolso é <strong>integral</strong>.
                                </Callout>

                                <Callout variant="warning" title="Uso/entrega do serviço">
                                    Se o guia personalizado já foi disponibilizado ou a assessoria iniciada mediante solicitação/consentimento,
                                    poderemos reter valor proporcional ao serviço efetivamente prestado (boa-fé objetiva – CDC).
                                </Callout>

                                <UL>
                                    <LI>
                                        Fora do prazo legal de 7 dias, reembolsos são <strong>excepcionais</strong> e dependem de inexistência
                                        de entrega/uso.
                                    </LI>
                                    <LI>
                                        Para solicitar, envie e-mail para <A href={`mailto:${CONTACT}`}>{CONTACT}</A> com assunto “Reembolso”.
                                    </LI>
                                    <LI>Tarifas e prazos de estorno do meio de pagamento podem se aplicar.</LI>
                                </UL>

                                <P>
                                    Observação: “Utilizado/entregue” inclui disponibilização do guia, login ou material exclusivo,
                                    ainda que você não os tenha acessado.
                                </P>
                            </Section>

                            <Section>
                                <H3>10. Obrigações do usuário</H3>
                                <UL>
                                    <LI>Fornecer dados verídicos e completos;</LI>
                                    <LI>Seguir as orientações do guia e verificar canais oficiais;</LI>
                                    <LI>Guardar logins/senhas com segurança;</LI>
                                    <LI>Não reproduzir/compartilhar conteúdos exclusivos sem autorização.</LI>
                                </UL>
                            </Section>

                            <Section>
                                <H3>11. Propriedade intelectual</H3>
                                <P>
                                    Conteúdos, guias, textos, checklists, marcas e layout são de nossa titularidade/licença e protegidos por lei.
                                    É vedada reprodução, distribuição ou engenharia reversa sem autorização.
                                </P>
                            </Section>

                            <Section>
                                <H3>12. Privacidade e proteção de dados</H3>
                                <P>
                                    Tratamos dados pessoais conforme a <strong>LGPD (Lei 13.709/2018)</strong>, para execução do contrato
                                    e cumprimento de obrigações legais. Detalhes na nossa <strong>Política de Privacidade</strong>.
                                    Para exercer direitos de titular, escreva para <A href={`mailto:${CONTACT}`}>{CONTACT}</A>.
                                </P>
                            </Section>

                            <Section>
                                <H3>13. Suporte</H3>
                                <P>
                                    Atendimento em dias úteis, horário comercial, pelo e-mail <A href={`mailto:${CONTACT}`}>{CONTACT}</A>.
                                </P>
                            </Section>

                            <Section>
                                <H3>14. Suspensão e encerramento</H3>
                                <P>
                                    Podemos suspender/encerrar acesso em caso de fraude, chargeback, violação destes Termos
                                    ou requisição legal.
                                </P>
                            </Section>

                            <Section>
                                <H3>15. Alterações</H3>
                                <P>
                                    Podemos atualizar estes Termos a qualquer tempo. A versão vigente é a publicada na plataforma
                                    com a data de atualização. O uso continuado implica concordância.
                                </P>
                            </Section>

                            <Section>
                                <H3>16. Lei aplicável e foro</H3>
                                <P>
                                    Aplica-se a legislação brasileira (CDC, Decreto 7.962/2013, Marco Civil e LGPD). Em disputas de consumo,
                                    prevalece o <strong>foro do domicílio do consumidor</strong>.
                                </P>
                            </Section>
                        </ContentInner>
                    </Content>
                </Item>

                {/* ===== Política de Privacidade ===== */}
                <Item value="privacy">
                    <Trigger><GlobeIcon /> Política de Privacidade</Trigger>
                    <Content>
                        <ContentInner>
                            <PrivacyContent
                                brand="Guia do Documento"
                                contact="contato@guiadodocumento.com.br"
                            />
                        </ContentInner>
                    </Content>
                </Item>
            </Root>
        </Container>
    );
}

export default TermsAccordion;
