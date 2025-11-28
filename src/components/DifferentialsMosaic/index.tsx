'use client';

import { CheckCircledIcon, LightningBoltIcon, LockClosedIcon, RocketIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import {
    Badge,
    BadgeRow,
    Eyebrow,
    Heading,
    Kicker,
    Lead,
    Mosaic,
    Text,
    Tile,
    TileBody,
    Title,
    Wrap
} from './styles';

export default function DifferentialsMosaic() {
    return (
        <Wrap aria-labelledby="why-us">
            <Kicker>Por que escolher a gente?</Kicker>
            <Title id="why-us">
                Tecnologia inteligente, estrutura confiável<br />e foco absoluto em performance.
            </Title>
            <Lead>
                Nossa assessoria vai além do básico: orientamos o passo a passo oficial com clareza, segurança e
                previsibilidade — sempre deixando claro que somos serviço privado e opcional.
            </Lead>

            {/* GRID MOSAICO */}
            <Mosaic>
                {/* A: Operações com maiores demandas (grande) */}
                <Tile area="a" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=920&q=80"
                            alt="Equipe colaborando em atendimento humano"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                            priority
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow><RocketIcon /> Acompanhamento Humanizado</Eyebrow>
                        <Heading>Atendimento humano + playbook claro</Heading>
                        <Text>Suporte estratégico e orientações objetivas para sua equipe seguir com segurança.</Text>
                    </TileBody>
                </Tile>

                {/* B: Interface intuitiva (wide) */}
                <Tile area="b" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=920&q=80"
                            alt="Pessoa usando notebook com interface intuitiva"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow><LightningBoltIcon /> Interface Intuitiva</Eyebrow>
                        <Text>Experiência simples para você e seus clientes — sem jargões.</Text>
                    </TileBody>
                </Tile>

                {/* C: Processamento rápido (tall) */}
                <Tile area="c" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=920&q=80"
                            alt="Cidade acelerada representando agilidade"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow><CheckCircledIcon /> Rápidez e Agilidade</Eyebrow>
                        <Text>Alta performance mesmo em volumes elevados. Menos retrabalho, mais aprovação.</Text>
                    </TileBody>
                </Tile>

                {/* D: Segurança robusta */}
                <Tile area="d" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=920&q=80"
                            alt="Cadeado representando segurança robusta"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow><LockClosedIcon /> Segurança Robusta</Eyebrow>
                        <Text>Mecanismos antifraude e proteção de dados. Cobertura para disputas.</Text>
                    </TileBody>
                </Tile>

                {/* E: Tile destaque (verde brand) */}
                <Tile area="e" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=920&q=80"
                            alt="Gráfico financeiro representando taxas transparentes"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow><LightningBoltIcon /> Taxas Transparentes</Eyebrow>
                        <Heading>Taxas Transparentes</Heading>
                        <Text>Previsibilidade financeira e mais margem para o seu negócio.</Text>
                    </TileBody>
                </Tile>

                {/* F: Flexibilidade operacional */}
                <Tile area="f" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=920&q=80"
                            alt="Trabalho remoto e integração representando flexibilidade operacional"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow>Flexibilidade Operacional</Eyebrow>
                        <Text>Fluxos que se adaptam à lógica da sua operação. APIs e integrações limpas.</Text>
                    </TileBody>
                </Tile>

                {/* G: Liquidez / controle de fluxo (phone mock) */}
                <Tile area="g" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=920&q=80"
                            alt="Controle de fluxo financeiro representando agenciamento controlado"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow>Agenciamento Controlado</Eyebrow>
                        <Text>Recebimento acelerado e visão diária para tomar decisões com segurança.</Text>
                    </TileBody>
                </Tile>

                {/* H: Recursos exclusivos */}
                <Tile area="h" visual="dark">
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=920&q=80"
                            alt="Automação e checklist digital representando recursos automatizados"
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover', filter: 'brightness(0.45) saturate(1.1)' }}
                        />
                    </div>
                    <TileBody style={{ position: 'relative', zIndex: 1 }}>
                        <Eyebrow>Recursos Automatizados</Eyebrow>
                        <Text>Modelos prontos, checklists inteligentes e comunicações claras para o usuário.</Text>
                        <BadgeRow>
                            <Badge>Checklist Inteligente</Badge>
                            <Badge>Passo a Passo</Badge>
                            <Badge>Suporte Humano</Badge>
                        </BadgeRow>
                    </TileBody>
                </Tile>
            </Mosaic>
        </Wrap>
    );
}
