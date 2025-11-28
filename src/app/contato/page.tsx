'use client';

import Footer from '@/components/Footer';
import Select from '@/components/Select';
import SiteHeader from '@/components/SiteHeader';
import Link from 'next/link';
import React, { useState } from 'react';
import {
    Actions,
    ChannelCard,
    ChannelIcon,
    ChannelItem,
    ChannelText,
    ChannelTitle,
    ColLeft,
    ColRight,
    FAQGrid,
    FAQWrap,
    Field,
    FieldRow,
    Form,
    FormCard,
    FormDesc,
    FormHead,
    Grid,
    Helper,
    Input,
    Label,
    Lead,
    Page,
    QA,
    QAText,
    QATitle,
    Required,
    SubmitBtn,
    Textarea,
    TipCard, TipIcon,
    TipText,
    TipTitle,
    Title,
    Wrap
} from './page.styles';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [assunto, setAssunto] = useState('');

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
            setLoading(true);
            // TODO: troque pelo seu endpoint real
            // await fetch('/api/contact', { method:'POST', body: JSON.stringify(payload) });
            await new Promise((r) => setTimeout(r, 900)); // mock
            setSent(true);
            e.currentTarget.reset();
        } finally {
            setLoading(false);
        }
    }

    return (
        <Page>
            <SiteHeader />

            {/** Conteúdo principal */}
            <Wrap>
                <Title>Fale Conosco</Title>
                <Lead>
                    Estamos aqui para ajudar você com todas as suas dúvidas sobre processos documentais.
                    Entre em contato conosco pelos canais abaixo.
                </Lead>

                <Grid>
                    {/* Esquerda */}
                    <ColLeft>
                        <ChannelCard aria-labelledby="canal-title">
                            <ChannelTitle id="canal-title">Canais de Atendimento</ChannelTitle>

                            <ChannelItem>
                                <ChannelIcon aria-hidden>✉️</ChannelIcon>
                                <div>
                                    <strong>Email</strong>
                                    <ChannelText>
                                        <Link href="mailto:contato@guiadodocumento.com.br">
                                            contato@guiadodocumento.com.br
                                        </Link>
                                        <br />Respostas em até 24 horas úteis
                                    </ChannelText>
                                </div>
                            </ChannelItem>

                            <ChannelItem>
                                <ChannelIcon aria-hidden>🕘</ChannelIcon>
                                <div>
                                    <strong>Horário de Atendimento</strong>
                                    <ChannelText>
                                        Segunda a Sexta: 08h às 17h30<br />Exceto feriados nacionais
                                    </ChannelText>
                                </div>
                            </ChannelItem>

                            <ChannelItem>
                                <ChannelIcon aria-hidden>💻</ChannelIcon>
                                <div>
                                    <strong>Atendimento</strong>
                                    <ChannelText>
                                        Atendimento exclusivamente online<br />Serviço de assessoria digital
                                    </ChannelText>
                                </div>
                            </ChannelItem>
                        </ChannelCard>

                        <TipCard role="note">
                            <TipIcon aria-hidden>💡</TipIcon>
                            <div>
                                <TipTitle>Dica Importante</TipTitle>
                                <TipText>
                                    Para agilizar o atendimento, tenha em mãos o <strong>nº do seu pedido</strong> (se já tiver feito alguma solicitação)
                                    e descreva sua dúvida de forma detalhada.
                                </TipText>
                            </div>
                        </TipCard>
                    </ColLeft>

                    {/* Direita */}
                    <ColRight>
                        <FormCard>
                            <FormHead>Envie sua Mensagem</FormHead>
                            <FormDesc>
                                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                            </FormDesc>

                            <Form onSubmit={onSubmit}>
                                <FieldRow>
                                    <Field>
                                        <Label htmlFor="name">Nome Completo <Required>*</Required></Label>
                                        <Input id="name" name="name" required placeholder="Seu nome completo" />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="email">Email <Required>*</Required></Label>
                                        <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
                                    </Field>
                                </FieldRow>

                                <FieldRow>
                                    <Field>
                                        <Label htmlFor="phone">Telefone (opcional)</Label>
                                        <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="subject">Assunto <Required>*</Required></Label>
                                        <Select
                                            placeholder="Selecione o assunto"
                                            options={[
                                                { label: 'Dúvidas gerais', value: 'duvidas' },
                                                { label: 'Acompanhamento de pedido', value: 'pedido' },
                                                { label: 'Pagamentos', value: 'pagamento' },
                                                { label: 'Documentos / exigências', value: 'documentos' },
                                                { label: 'Outros', value: 'outros' },
                                            ]}
                                            value={assunto}
                                            onChange={(value) => setAssunto(value)}
                                        />
                                    </Field>
                                </FieldRow>

                                <Field>
                                    <Label htmlFor="message">Mensagem <Required>*</Required></Label>
                                    <Textarea id="message" name="message" required placeholder="Descreva sua dúvida ou solicitação de forma detalhada..." />
                                </Field>

                                <Helper>* Campos obrigatórios</Helper>

                                <Actions>
                                    <SubmitBtn
                                        type="submit"
                                        aria-disabled={loading}
                                        disabled={loading}
                                        data-size="sm"
                                    >
                                        {loading ? 'Enviando…' : 'Enviar Mensagem'}
                                    </SubmitBtn>
                                    {sent && <span role="status" aria-live="polite">Mensagem enviada! Responderemos por email.</span>}
                                </Actions>
                            </Form>
                        </FormCard>
                    </ColRight>
                </Grid>

                {/* FAQ */}
                <FAQWrap>
                    <FAQGrid>
                        <QA>
                            <QATitle>Como acompanhar meu pedido?</QATitle>
                            <QAText>Use o botão “Acompanhar Pedido” no menu superior com suas credenciais enviadas por email.</QAText>
                        </QA>
                        <QA>
                            <QATitle>Qual o prazo de resposta?</QATitle>
                            <QAText>Respondemos todas as mensagens em até 24 horas úteis. Casos urgentes são priorizados.</QAText>
                        </QA>
                        <QA>
                            <QATitle>Problemas com pagamento?</QATitle>
                            <QAText>Entre em contato informando o ID do pedido e descreva o problema com o pagamento.</QAText>
                        </QA>
                        <QA>
                            <QATitle>Dúvidas sobre documentos?</QATitle>
                            <QAText>Nossa equipe pode esclarecer quais informações e comprovantes normalmente são solicitados para cada tipo de processo.</QAText>
                        </QA>
                    </FAQGrid>
                </FAQWrap>
            </Wrap>

            <Footer />
        </Page>
    );
}
