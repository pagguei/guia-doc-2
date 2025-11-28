'use client';

import DifferentialsMosaic from '@/components/DifferentialsMosaic';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import * as Accordion from '@radix-ui/react-accordion';
import {
  ChevronDownIcon,
  IdCardIcon,
  InfoCircledIcon,
  LockClosedIcon,
  MoveIcon,
  QuestionMarkCircledIcon,
  StarIcon,
  UpdateIcon
} from '@radix-ui/react-icons';
import Image from 'next/image';
import { useMemo } from 'react';
import {
  Author,
  Avatar,
  BottomCTA,
  BottomSubtitle,
  BottomTitle,
  Card,
  Cards,
  CardText,
  CardTitle,
  Content,
  Ctas,
  Eyebrow,
  FAQ,
  GlowCard,
  Hero,
  HeroArt, HeroBody,
  HeroGrid,
  HeroHelper,
  Item,
  Mosaic,
  MosaicBig, MosaicMid, MosaicTall,
  MosaicText,
  MosaicTitle,
  MosaicWide,
  NoticeText,
  Page,
  Primary,
  PrimaryCTA,
  Quote,
  Secondary,
  SecondaryCTA,
  Section,
  SectionKicker, SectionLead,
  SectionTitle,
  Step, StepNum,
  Steps,
  StepText,
  StepTitle,
  Subtitle,
  TestiLarge,
  Testimonials,
  TestiSmall,
  Title,
  TopNotice,
  Trigger
} from './page.styles';

export default function MarketingHome() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Page>

      {/* Header */}
      <SiteHeader />





      {/* Hero */}
      <Hero>
        <HeroGrid>
          {/* imagem (área: art) */}
          <HeroArt>
            <Image
              src="/peoples/woman-flags.png"
              alt="Organização de documentos e passo a passo para tirar passaporte"
              width={635}
              height={489}
              priority
              sizes="(max-width: 960px) 100vw, 635px"
              style={{ width: '100%', height: 'auto' }}
            />
          </HeroArt>

          {/* texto/cta (área: body) */}
          <HeroBody>
            <Eyebrow>🇧🇷 Guia Para Documentação Brasileira</Eyebrow>
            <Title>Guia de Passaporte</Title>
            <Subtitle>
              Orientação passo a passo, conferência de dados e suporte humano para você solicitar seu passaporte com tranquilidade. Sem filas desnecessárias, sem complicação.
            </Subtitle>
            <Ctas>
              <PrimaryCTA href="/solicitacao" data-full>
                <IdCardIcon /> Guia da Primeira Via
              </PrimaryCTA>
              <SecondaryCTA href="/solicitacao" data-full>
                <UpdateIcon /> Guia da Renovação
              </SecondaryCTA>
            </Ctas>
          </HeroBody>
        </HeroGrid>
      </Hero>



      {/* Benefícios */}
      <DifferentialsMosaic />


      <Section id="mosaico">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionKicker>Transparência & experiência</SectionKicker>
        </div>
        <SectionTitle>Tecnologia simples para um processo previsível</SectionTitle>
        <SectionLead>Sem promessas de aprovação: entregamos organização, clareza de etapas e suporte humano.</SectionLead>

        <Mosaic>
          <MosaicBig className="card a">
            <Image
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
              alt="Checklist de documentos"
              fill
              style={{ objectFit: 'cover', borderRadius: '24px', opacity: 0.25 }}
            />
            <MosaicTitle>Para quem quer previsibilidade</MosaicTitle>
            <MosaicText>Menos idas e vindas: checklist e conferência formal antes de avançar.</MosaicText>
          </MosaicBig>

          <MosaicMid className="card b">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="Interface intuitiva"
              fill
              style={{ objectFit: 'cover', borderRadius: '24px', opacity: 0.25 }}
            />
            <MosaicTitle>Interface intuitiva</MosaicTitle>
            <MosaicText>Guia passo a passo, linguagem simples.</MosaicText>
          </MosaicMid>

          <MosaicMid className="card c">
            <Image
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
              alt="Segurança"
              fill
              style={{ objectFit: 'cover', borderRadius: '24px', opacity: 0.25 }}
            />
            <MosaicTitle>Segurança</MosaicTitle>
            <MosaicText>Ambiente seguro e registros de atendimento.</MosaicText>
          </MosaicMid>

          <MosaicTall className="card d">
            <Image
              src="https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80"
              alt="Taxas oficiais"
              fill
              style={{ objectFit: 'cover', borderRadius: '24px', opacity: 0.25 }}
            />
            <MosaicTitle>Taxas oficiais</MosaicTitle>
            <MosaicText>Não recebemos taxas governamentais.</MosaicText>
          </MosaicTall>

          <MosaicWide className="card e">
            <Image
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
              alt="Suporte humano"
              fill
              style={{ objectFit: 'cover', borderRadius: '24px', opacity: 0.25 }}
            />
            <MosaicTitle>Suporte humano</MosaicTitle>
            <MosaicText>Canal em horário comercial para dúvidas recorrentes.</MosaicText>
          </MosaicWide>
        </Mosaic>
      </Section>


      {/* Como funciona */}
      <Section id="como-funciona">
        <SectionTitle>Como funciona</SectionTitle>
        <Steps>
          <Step>
            <StepNum>1</StepNum>
            <StepTitle>Preencha o questionário</StepTitle>
            <StepText>Coletamos somente o essencial para montar seu guia personalizado.</StepText>
          </Step>
          <Step>
            <StepNum>2</StepNum>
            <StepTitle>Escolha o tipo de guia</StepTitle>
            <StepText>Primeira via ou renovação. Você recebe instruções específicas para seu caso.</StepText>
          </Step>
          <Step>
            <StepNum>3</StepNum>
            <StepTitle>Siga o passo a passo</StepTitle>
            <StepText>Com o guia em mãos, faça a solicitação oficial junto aos órgãos competentes.</StepText>
          </Step>
        </Steps>
        <Ctas style={{ justifyContent: 'center' }}>
          <Primary href="/solicitacao">Começar agora</Primary>
        </Ctas>
      </Section>


      {/* Incluso / Não incluso */}
      <Section aria-labelledby="incl-nao-incl">
        <SectionTitle id="incl-nao-incl">O que está incluso — e o que não está</SectionTitle>
        <Cards>
          <GlowCard aria-label="Incluso">
            <CardTitle>✔️ Incluso na assessoria</CardTitle>
            <CardText as="div">
              <ul>
                <li>Checklist de documentos e conferência formal</li>
                <li>Passo a passo detalhado do início ao agendamento</li>
                <li>Modelos de declarações quando aplicável</li>
                <li>Suporte humano por e-mail/WhatsApp (horário comercial)</li>
              </ul>
            </CardText>
          </GlowCard>
          <Card aria-label="Não incluso">
            <CardTitle>❌ Não incluso</CardTitle>
            <CardText as="div">
              <ul>
                <li>Emissão do passaporte (competência exclusiva de órgão oficial)</li>
                <li>Pagamento de taxas governamentais</li>
                <li>Agendamento em seu nome quando não autorizado</li>
                <li>Qualquer prioridade/benefício junto a órgãos públicos</li>
              </ul>
            </CardText>
          </Card>
        </Cards>
        <HeroHelper style={{ textAlign: 'center' }}>
          Somos serviço privado e opcional. Você pode fazer tudo por conta própria nos canais oficiais.
        </HeroHelper>
      </Section>

      {/* Provas sociais / selos simples */}
      <Section aria-labelledby="provas">
        <SectionTitle id="provas">Sinais de confiança</SectionTitle>
        <Cards>
          <Card>
            <CardTitle>🔒 Pagamento seguro</CardTitle>
            <CardText>Ambiente criptografado e parceiro de pagamentos certificado.</CardText>
          </Card>
          <GlowCard>
            <CardTitle>📄 Transparência</CardTitle>
            <CardText>Políticas públicas e contratos claros, sem letras miúdas.</CardText>
          </GlowCard>
          <Card>
            <CardTitle>⭐ Clientes satisfeitos</CardTitle>
            <CardText>Atendimento humano para dúvidas comuns durante o processo.</CardText>
          </Card>
        </Cards>
      </Section>

      {/* Comparativo neutro */}
      <Section aria-labelledby="comparativo">
        <SectionTitle id="comparativo">Com e sem assessoria</SectionTitle>
        <Cards>
          <Card>
            <CardTitle>Fazendo direto no órgão</CardTitle>
            <CardText as="div">
              <ul>
                <li>Você pesquisa requisitos e preenche tudo sozinho</li>
                <li>Responsável por conferência e correções</li>
                <li>Sem custo de assessoria</li>
              </ul>
            </CardText>
          </Card>
          <GlowCard>
            <CardTitle>Com nossa assessoria</CardTitle>
            <CardText as="div">
              <ul>
                <li>Checklist, modelos e passo a passo personalizado</li>
                <li>Conferência formal para reduzir retrabalho</li>
                <li>Suporte humano durante o caminho</li>
              </ul>
            </CardText>
          </GlowCard>
        </Cards>
      </Section>


      {/* Faixa de segurança sobre taxas */}
      <TopNotice role="note" aria-label="Aviso sobre taxas oficiais">
        <NoticeText>
          <strong>Importante:</strong> nossa assessoria <strong>não cobra</strong> nem recebe taxas governamentais.
          Quando aplicável, você pagará a taxa oficial diretamente ao órgão/banco indicado no processo.
        </NoticeText>
      </TopNotice>


      <Section id="depoimentos" aria-labelledby="depos">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionKicker id="depos">Depoimentos</SectionKicker>
        </div>
        <SectionTitle>Quem usou nossa assessoria</SectionTitle>

        <Testimonials>
          <TestiLarge>
            <Quote>“Precisava de clareza. O guia e o checklist evitaram erro bobo e agilizaram tudo.”</Quote>
            <Author>
              <Avatar src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=64&h=64&q=80" alt="Ana P." width={28} height={28} />
              <div><strong>Ana P.</strong><span> São Paulo • Primeira via</span></div>
            </Author>
          </TestiLarge>

          <TestiSmall>
            <Quote>“Atendimento educado e objetivo. Gostei do passo a passo.”</Quote>
            <Author><Avatar src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=48&h=48&q=80" alt="Jéssica" width={24} height={24} /><div><strong>Jéssica</strong><span> Renovação</span></div></Author>
          </TestiSmall>

          <TestiSmall>
            <Quote>“Evitei retrabalho na hora de juntar documentos.”</Quote>
            <Author><Avatar src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=48&h=48&q=80" alt="Camila" width={24} height={24} /><div><strong>Camila</strong><span> Primeira via</span></div></Author>
          </TestiSmall>

          <TestiSmall>
            <Quote>“Processo ficou mais previsível com o checklist.”</Quote>
            <Author><Avatar src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=48&h=48&q=80" alt="Rafaela" width={24} height={24} /><div><strong>Rafaela</strong><span> Renovação</span></div></Author>
          </TestiSmall>
        </Testimonials>
      </Section>


      {/* FAQ */}
      <Section id="faq">
        <SectionTitle>Perguntas frequentes</SectionTitle>
        <FAQ>
          <Accordion.Root type="multiple" defaultValue={[]}>
            <Accordion.Item value="q5">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><LockClosedIcon /></span>
                    Vocês são afiliados à Polícia Federal?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Não. Não possuímos qualquer vínculo com a Polícia Federal ou outros órgãos. Prestamos apenas assessoria privada e opcional.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
            <Accordion.Item value="q6">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><MoveIcon /></span>
                    Onde pago a taxa oficial?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Quando aplicável, a taxa oficial é paga diretamente ao órgão público ou banco arrecadador indicado no processo. Nós não recebemos essa taxa.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
            <Accordion.Item value="q1">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><InfoCircledIcon /></span>
                    Este é um site governamental?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Não. Somos uma empresa privada de assessoria e guia documental. O processo oficial é realizado junto aos órgãos públicos competentes.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
            <Accordion.Item value="q2">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><QuestionMarkCircledIcon /></span>
                    O serviço é obrigatório?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Não. Nosso serviço é totalmente opcional. Você pode realizar a solicitação diretamente pelos canais oficiais sem utilizar nossa assessoria.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
            <Accordion.Item value="q3">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><IdCardIcon /></span>
                    Vocês emitem o passaporte?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Não. A emissão é exclusiva dos órgãos oficiais. Prestamos orientação, conferência de dados e suporte ao preenchimento.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
            <Accordion.Item value="q4">
              <Item>
                <Accordion.Trigger asChild>
                  <Trigger>
                    <span className="faq-icon"><StarIcon /></span>
                    Há reembolso?
                    <ChevronDownIcon className="icon" aria-hidden />
                  </Trigger>
                </Accordion.Trigger>
                <Accordion.Content asChild>
                  <Content>
                    Sim, conforme política de devolução e prazos de arrependimento do consumidor. As taxas oficiais pagas aos órgãos públicos não são reembolsadas por nós.
                  </Content>
                </Accordion.Content>
              </Item>
            </Accordion.Item>
          </Accordion.Root>
        </FAQ>
      </Section>

      {/* CTA final */}
      <BottomCTA>
        <BottomTitle>Pronto para começar?</BottomTitle>
        <BottomSubtitle>Receba um guia claro e siga o processo oficial com tranquilidade.</BottomSubtitle>
        <Ctas style={{ justifyContent: 'center' }}>
          <Primary href="/solicitacao">Começar agora</Primary>
          <Secondary href="/contato">Falar com atendimento</Secondary>
        </Ctas>
        <HeroHelper>Serviço de consultoria opcional, independente dos órgãos públicos.</HeroHelper>
      </BottomCTA>

      {/* Footer */}
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Guia do Documento',
            url: 'https://www.guiadodocumento.com.br',
            logo: 'https://www.guiadodocumento.com.br/logo-guia.png',
            sameAs: []
          })
        }}
      />
      {/* Service (transparência sobre o que vendemos) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Assessoria para solicitação de passaporte (privada e opcional)',
            provider: { '@type': 'Organization', name: 'Guia do Documento' },
            areaServed: 'BR',
            offers: {
              '@type': 'Offer',
              price: '149.00',
              priceCurrency: 'BRL',
              description: 'Checklist, conferência formal, passo a passo e suporte humano.'
            }
          })
        }}
      />

      {/* FAQPage (para rich result) — mantenha perguntas iguais às do acordeon */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Este é um site governamental?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Não. Somos empresa privada de assessoria e guia documental. O processo oficial é realizado junto aos órgãos públicos.'
                }
              },
              {
                '@type': 'Question',
                name: 'O serviço é obrigatório?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Não. É totalmente opcional e você pode solicitar diretamente pelos canais oficiais.'
                }
              },
              {
                '@type': 'Question',
                name: 'Vocês emitem o passaporte?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Não. A emissão é exclusiva dos órgãos oficiais. Prestamos orientação, conferência de dados e suporte ao preenchimento.'
                }
              },
              {
                '@type': 'Question',
                name: 'Onde pago a taxa oficial?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A taxa oficial é paga diretamente ao órgão público/banco arrecadador indicado no processo. Não recebemos essa taxa.'
                }
              }
            ]
          })
        }}
      />

    </Page>
  );
}
