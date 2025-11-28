'use client';

import * as React from 'react';
import {
    Section, H3, P, UL, OL, LI, A,
    CalloutWrap, CalloutIcon, CalloutBody, CalloutTitle
} from './styles';
import {
    CheckCircledIcon,
    ExclamationTriangleIcon,
    InfoCircledIcon,
} from '@radix-ui/react-icons';

type Variant = 'info' | 'warning' | 'success';
function Callout({
    variant,
    title,
    children,
}: { variant: Variant; title?: React.ReactNode; children?: React.ReactNode }) {
    const Icon =
        variant === 'warning'
            ? ExclamationTriangleIcon
            : variant === 'success'
                ? CheckCircledIcon
                : InfoCircledIcon;

    return (
        <CalloutWrap $variant={variant} role="status" aria-live="polite">
            <CalloutIcon $variant={variant}><Icon /></CalloutIcon>
            <CalloutBody>
                {title && <CalloutTitle>{title}</CalloutTitle>}
                <div>{children}</div>
            </CalloutBody>
        </CalloutWrap>
    );
}

export default function PrivacyContent({
    brand = 'Guia do Documento',
    contact = 'contato@guiadodocumento.com.br',
}: {
    brand?: string;
    contact?: string;
}) {
    return (
        <>
            <Section>
                <H3>1. Controlador e Encarregado (DPO)</H3>
                <P>
                    Esta Política descreve como o <strong>{brand}</strong> (“Plataforma”, “nós”)
                    trata dados pessoais nos termos da <strong>LGPD – Lei 13.709/2018</strong>.
                    Somos o <strong>controlador</strong> dos dados tratados nesta Plataforma.
                </P>
                <P>
                    <strong>Encarregado/DPO:</strong> Equipe de Privacidade — <A href={`mailto:${contact}`}>{contact}</A>.
                </P>

                <Callout variant="info" title="Escopo">
                    Aplicável aos visitantes do site, clientes e demais titulares que interajam com nossos serviços
                    de assessoria/guia para emissão de documentos (ex.: passaporte).
                </Callout>
            </Section>

            <Section>
                <H3>2. Princípios de tratamento</H3>
                <P>
                    Observamos os princípios da LGPD: finalidade, adequação, necessidade (minimização),
                    livre acesso, qualidade dos dados, transparência, segurança, prevenção,
                    não discriminação e responsabilização/prestação de contas.
                </P>
            </Section>

            <Section>
                <H3>3. Quais dados coletamos</H3>
                <UL>
                    <LI><strong>Dados cadastrais:</strong> nome, e-mail, telefone; eventualmente CPF/RG quando necessário ao serviço.</LI>
                    <LI><strong>Dados de endereço:</strong> CEP, logradouro, número, complemento, bairro, cidade, UF.</LI>
                    <LI><strong>Dados para personalização do guia:</strong> informações do perfil relevantes ao passo a passo.</LI>
                    <LI><strong>Dados de transação:</strong> itens contratados, valores, meio de pagamento (não armazenamos dados sensíveis do cartão).</LI>
                    <LI><strong>Dados técnicos:</strong> IP, user-agent, identificadores de dispositivo, cookies, analytics e logs de acesso/erro.</LI>
                    <LI><strong>Comunicações:</strong> mensagens enviadas ao suporte/atendimento.</LI>
                </UL>

                <Callout variant="warning" title="Crianças e adolescentes">
                    Nosso serviço não é direcionado a menores de 18 anos. Caso identifiquemos coleta indevida,
                    providenciaremos a exclusão. Pais/responsáveis podem solicitar remoção via {contact}.
                </Callout>
            </Section>

            <Section>
                <H3>4. Finalidades e bases legais</H3>
                <P>Tratamos dados pessoais nas seguintes hipóteses (art. 7º LGPD):</P>
                <UL>
                    <LI><strong>Execução de contrato</strong> — atendimento, entrega do guia personalizado, suporte e cobrança.</LI>
                    <LI><strong>Cumprimento de obrigação legal/regulatória</strong> — obrigações fiscais/contábeis, guarda de logs (Marco Civil, art. 15).</LI>
                    <LI><strong>Legítimo interesse</strong> — segurança, prevenção a fraudes, melhoria do serviço e métricas técnicas, respeitados direitos e expectativas do titular.</LI>
                    <LI><strong>Consentimento</strong> — comunicações de marketing (opt-in), cookies não essenciais e outras situações quando aplicável.</LI>
                    <LI><strong>Exercício regular de direitos</strong> — em processos administrativos/judiciais.</LI>
                </UL>

                <Callout variant="info" title="Sem decisões exclusivamente automatizadas">
                    Não tomamos decisões <em>exclusivamente automatizadas</em> que produzam efeitos legais ou relevantes
                    sobre você. Podemos empregar verificações automáticas de risco/abuso como medida de segurança.
                </Callout>
            </Section>

            <Section>
                <H3>5. Cookies e tecnologias semelhantes</H3>
                <UL>
                    <LI><strong>Essenciais:</strong> funcionais para navegação, autenticação, segurança.</LI>
                    <LI><strong>Analytics:</strong> medem uso e desempenho, de forma agregada/pseudonimizada.</LI>
                    <LI><strong>Funcionais:</strong> lembram preferências (ex.: idioma).</LI>
                    <LI><strong>Marketing (quando aplicável):</strong> campanhas e mensuração com seu consentimento.</LI>
                </UL>
                <P>
                    Você pode gerir cookies no seu navegador. O bloqueio de cookies essenciais pode afetar funcionalidades.
                </P>
            </Section>

            <Section>
                <H3>6. Compartilhamento com terceiros</H3>
                <P>
                    Podemos compartilhar dados com <strong>operadores</strong> estritamente necessários à prestação e
                    melhoria do serviço (provedores de nuvem/hospedagem, gateways de pagamento, ferramentas de suporte,
                    analytics e prevenção a fraudes), sempre com obrigações contratuais de segurança e confidencialidade.
                </P>
                <P>
                    Também podemos compartilhar para <strong>cumprimento de obrigação legal</strong>, <strong>ordem de autoridade</strong> competente
                    ou <strong>exercício regular de direitos</strong>.
                </P>
            </Section>

            <Section>
                <H3>7. Transferências internacionais</H3>
                <P>
                    Alguns provedores podem estar localizados fora do Brasil. Nesses casos, adotamos salvaguardas
                    adequadas conforme a LGPD (art. 33) — como cláusulas contratuais, políticas corporativas e
                    medidas técnicas/organizacionais para proteção dos dados.
                </P>
            </Section>

            <Section>
                <H3>8. Segurança da informação</H3>
                <UL>
                    <LI>Criptografia em trânsito (TLS) e, quando aplicável, em repouso;</LI>
                    <LI>Controles de acesso com princípio do menor privilégio;</LI>
                    <LI>Monitoramento, registros de acesso e prevenção a abusos;</LI>
                    <LI>Backups e procedimentos de continuidade;</LI>
                    <LI>Treinamento e confidencialidade com colaboradores/prestadores.</LI>
                </UL>

                <Callout variant="success" title="Boas práticas do usuário">
                    Use senha forte, não compartilhe acessos e mantenha seu dispositivo atualizado.
                </Callout>
            </Section>

            <Section>
                <H3>9. Retenção e descarte</H3>
                <P>
                    Mantemos dados apenas pelo tempo necessário às finalidades e conforme prazos legais/regulatórios.
                    Exemplos usuais:
                </P>
                <UL>
                    <LI><strong>Registros de aplicação/acesso:</strong> mínimo de 6 meses (<em>Marco Civil</em>, art. 15).</LI>
                    <LI><strong>Dados de faturamento/nota:</strong> até 5 anos (obrigações fiscais/contábeis).</LI>
                    <LI><strong>Histórico de suporte:</strong> até 2 anos após o encerramento do atendimento.</LI>
                    <LI><strong>Marketing:</strong> até revogação do consentimento (opt-out).</LI>
                    <LI><strong>Conta inativa:</strong> anonimização/eliminação após período razoável, salvo obrigação legal.</LI>
                </UL>
            </Section>

            <Section>
                <H3>10. Direitos do titular</H3>
                <P>
                    Você pode exercer, gratuitamente, os direitos previstos no art. 18 da LGPD:
                </P>
                <UL>
                    <LI>Confirmação da existência de tratamento e acesso aos dados;</LI>
                    <LI>Correção de dados incompletos, inexatos ou desatualizados;</LI>
                    <LI>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</LI>
                    <LI>Portabilidade (observadas normas da ANPD e segredos de negócio);</LI>
                    <LI>Informação sobre compartilhamento e sobre a possibilidade de não fornecer consentimento;</LI>
                    <LI>Revogação do consentimento e eliminação de dados tratados com base no consentimento;</LI>
                    <LI>Revisão de decisões automatizadas, quando aplicável;</LI>
                    <LI>Reclamação à <strong>ANPD</strong> ou órgãos de defesa do consumidor.</LI>
                </UL>
                <P>
                    Para exercer seus direitos, entre em contato: <A href={`mailto:${contact}`}>{contact}</A>.
                    Podemos solicitar comprovação de identidade para sua segurança.
                </P>
            </Section>

            <Section>
                <H3>11. Comunicações de marketing</H3>
                <P>
                    Enviamos comunicações promocionais somente com <strong>consentimento</strong>. Você pode cancelar a inscrição
                    a qualquer momento (link de descadastro no e-mail) ou solicitando via {contact}.
                </P>
            </Section>

            <Section>
                <H3>12. Links de terceiros</H3>
                <P>
                    Nosso conteúdo pode conter links para sites de terceiros. Não controlamos tais ambientes e não nos
                    responsabilizamos por suas práticas de privacidade. Recomendamos que você leia as políticas de cada site acessado.
                </P>
            </Section>

            <Section>
                <H3>13. Atualizações desta Política</H3>
                <P>
                    Podemos atualizar esta Política para refletir mudanças legislativas, regulatórias ou operacionais.
                    A versão vigente será sempre a publicada na Plataforma, com a data de atualização.
                </P>
            </Section>

            <Section>
                <H3>14. Contato</H3>
                <P>
                    Dúvidas, solicitações ou reclamações sobre privacidade e proteção de dados:<br />
                    <strong>E-mail:</strong> <A href={`mailto:${contact}`}>{contact}</A>
                </P>
            </Section>
        </>
    );
}
