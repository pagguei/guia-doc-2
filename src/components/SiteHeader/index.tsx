'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AvatarIcon, ChevronDownIcon, GlobeIcon, HamburgerMenuIcon, HomeIcon, IdCardIcon, InfoCircledIcon, QuestionMarkCircledIcon, ReaderIcon, UpdateIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import {
    Actions,
    Bar, Brand,
    Card, CardIcon,
    CardLink,
    CardText,
    CardTitle,
    Content,
    CTA,
    DesktopOnly,
    Divider,
    Divider2,
    DrawerAccContent,
    DrawerAccHeader,
    DrawerAccItem,
    DrawerAccordion, DrawerAccTrigger,
    DrawerClose,
    DrawerContent,
    DrawerGroup,
    DrawerHeader,
    DrawerItem,
    DrawerList,
    DrawerOverlay,
    DrawerTitle,
    HeaderWrap,
    HelpCard,
    Indicator,
    MegaGrid,
    MiniGrid,
    MobileBtn,
    MobileOnly,
    NavItem, NavLink,
    NavList,
    NavRoot,
    StartBtn,
    SubLink,
    Trigger,
    Viewport
} from './styles';

export default function SiteHeader() {
    const [open, setOpen] = React.useState(false);

    return (
        <HeaderWrap>
            <Bar>
                <Brand href="/">
                    <Image src="/logo-guia.png" alt="Guia do Documento" width={124} height={72} priority />
                </Brand>

                {/* DESKTOP */}
                <DesktopOnly>
                    <NavRoot delayDuration={0} skipDelayDuration={250}>
                        <NavList>
                            <NavItem>
                                <NavLink asChild>
                                    <Link href="#como-funciona">Como funciona</Link>
                                </NavLink>
                            </NavItem>

                            {/* Guias com mega menu */}
                            <NavItem>
                                <Trigger onPointerEnter={(e) => (e.currentTarget as HTMLElement).focus()}>
                                    Guias <ChevronDownIcon />
                                </Trigger>

                                <Content>
                                    <MegaGrid>
                                        <MiniGrid>
                                            <Card href="/solicitacao">
                                                <div>
                                                    <CardIcon aria-hidden><IdCardIcon /></CardIcon>
                                                </div>
                                                <SubLink>
                                                    <CardTitle>Guia da Primeira Via</CardTitle>
                                                    <CardText>Checklist completo para tirar o passaporte pela primeira vez.</CardText>
                                                    <CardLink>Saiba mais →</CardLink>
                                                </SubLink>
                                            </Card>

                                            <Card href="/renovacao">
                                                <div>
                                                    <CardIcon aria-hidden><UpdateIcon /></CardIcon>
                                                </div>
                                                <SubLink>
                                                    <CardTitle>Guia da Renovação</CardTitle>
                                                    <CardText>Passo a passo atualizado para renovar sem dor de cabeça.</CardText>
                                                    <CardLink>Saiba mais →</CardLink>
                                                </SubLink>
                                            </Card>
                                        </MiniGrid>

                                        <Divider />

                                        <HelpCard>
                                            <h4>Precisa de ajuda para escolher?</h4>
                                            <p>Nossa equipe orienta você no melhor caminho, sem custo.</p>
                                            <CTA href="/contato">Fale Conosco</CTA>
                                        </HelpCard>
                                    </MegaGrid>
                                </Content>
                            </NavItem>

                            <NavItem>
                                <NavLink asChild>
                                    <Link href="#planos">Planos</Link>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink asChild>
                                    <Link href="/contato">Fale Conosco</Link>
                                </NavLink>
                            </NavItem>
                        </NavList>

                        {/* seta que segue o link ativo */}
                        <Indicator />

                        {/* dropdown container */}
                        <Viewport />

                        <StartBtn href="/solicitacao"><AvatarIcon /> Área do Cliente</StartBtn>

                    </NavRoot>

                </DesktopOnly>

                {/* AÇÕES + MOBILE */}
                <MobileOnly>
                    <Actions>

                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger asChild>
                                <MobileBtn aria-label="Abrir menu">
                                    <HamburgerMenuIcon />
                                </MobileBtn>
                            </Dialog.Trigger>

                            <Dialog.Portal>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader>
                                        {/* TITULO REQUERIDO PELO RADIX */}
                                        <DrawerTitle>Menu</DrawerTitle>

                                        <Image src="/logo-guia.png" alt="Guia do Documento" width={112} height={56} />
                                        <DrawerClose aria-label="Fechar">✕</DrawerClose>
                                    </DrawerHeader>



                                    <DrawerList>
                                        <DrawerItem href="/" onClick={() => setOpen(false)}>
                                            <HomeIcon /> Início
                                        </DrawerItem>

                                        <DrawerItem href="#como-funciona" onClick={() => setOpen(false)}>
                                            <QuestionMarkCircledIcon /> Como funciona
                                        </DrawerItem>

                                        {/* Grupo de Guias no mobile com Accordion */}
                                        <DrawerGroup>
                                            <DrawerAccordion type="single" collapsible>
                                                <DrawerAccItem value="guias">
                                                    <DrawerAccHeader>
                                                        <DrawerAccTrigger><ReaderIcon /> Guias</DrawerAccTrigger>
                                                        <ChevronDownIcon />
                                                    </DrawerAccHeader>

                                                    <DrawerAccContent>
                                                        <Card href="/solicitacao">
                                                            <div>
                                                                <CardIcon aria-hidden><IdCardIcon /></CardIcon>
                                                            </div>
                                                            <SubLink>
                                                                <CardTitle>Guia da Primeira Via</CardTitle>
                                                                <CardText>Checklist completo para tirar o passaporte pela primeira vez.</CardText>
                                                                <CardLink>Saiba mais →</CardLink>
                                                            </SubLink>
                                                        </Card>

                                                        <Card href="/renovacao">
                                                            <div>
                                                                <CardIcon aria-hidden><UpdateIcon /></CardIcon>
                                                            </div>
                                                            <SubLink>
                                                                <CardTitle>Guia da Renovação</CardTitle>
                                                                <CardText>Passo a passo atualizado para renovar sem dor de cabeça.</CardText>
                                                                <CardLink>Saiba mais →</CardLink>
                                                            </SubLink>
                                                        </Card>

                                                        <Divider2 />

                                                        <HelpCard>
                                                            <h4>Precisa de ajuda para escolher?</h4>
                                                            <p>Nossa equipe orienta você no melhor caminho, sem custo.</p>
                                                            <CTA href="/contato">Fale Conosco</CTA>
                                                        </HelpCard>
                                                    </DrawerAccContent>
                                                </DrawerAccItem>
                                            </DrawerAccordion>
                                        </DrawerGroup>


                                        <DrawerItem href="#planos" onClick={() => setOpen(false)}><GlobeIcon /> Planos</DrawerItem>
                                        <DrawerItem href="/contato" onClick={() => setOpen(false)}><InfoCircledIcon /> Fale Conosco</DrawerItem>

                                        <DrawerItem href="/solicitacao" data-primary onClick={() => setOpen(false)}>
                                            <AvatarIcon />
                                            Área do Cliente
                                        </DrawerItem>
                                    </DrawerList>
                                </DrawerContent>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </Actions>

                </MobileOnly>
            </Bar>
        </HeaderWrap>
    );
}
