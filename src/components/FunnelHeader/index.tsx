// components/FunnelHeader/index.tsx
'use client';

import * as React from 'react';
import Stepper from '@/components/Stepper';
import {
    Shell, AppBar, BarContent, BackBtn, BackIcon, Title,
    Divider, ProgressWrap, ProgressHead, ProgressLabel, Percent,
    Track, Fill, StepperWrap, Container,
} from './styles';

type ClickMode = 'all' | 'backward' | 'none';

type Props = {
    title?: string;
    step: number;            // <- vem de fora
    totalSteps?: number;
    clickable?: ClickMode;
    onStepClick?: (idx: number) => void;
    onBack?: () => void;     // opcional
};

export default function FunnelHeader({
    title = 'Primeira Via do Passaporte',
    step,
    totalSteps = 4,
    clickable = 'backward',
    onStepClick,
    onBack,
}: Props) {
    const pct = totalSteps > 1 ? Math.round(((step - 1) / (totalSteps - 1)) * 100) : 0;

    return (
        <Shell>
            <AppBar>
                <Container>
                    <BarContent>
                        <BackBtn type="button" onClick={onBack}>
                            <BackIcon aria-hidden="true" />
                            Voltar
                        </BackBtn>
                        <Title>{title}</Title>
                        <span />
                    </BarContent>
                </Container>
            </AppBar>

            <Divider />

            <Container>
                <ProgressWrap>
                    <ProgressHead>
                        <ProgressLabel>Progresso</ProgressLabel>
                        <Percent aria-live="polite">{pct}% concluído</Percent>
                    </ProgressHead>
                    <Track role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                        <Fill style={{ width: `${pct}%` }} />
                    </Track>
                </ProgressWrap>

                <StepperWrap>
                    <Stepper
                        step={step}
                        clickable={clickable}
                        onStepClick={onStepClick}
                    />
                </StepperWrap>
            </Container>
        </Shell>
    );
}
