'use client';

import * as React from 'react';
import {
    Wrap,
    Header,
    Title,
    Percent,
    StepsRow,
    StepItem,
    Dot,
    Label,
    Connector,
} from './styles';

type ClickMode = 'all' | 'backward' | 'none';

export interface StepperProps {
    step: number;                          // 1-based
    labels?: readonly string[];
    onStepClick?: (idx: number) => void;
    title?: React.ReactNode;
    showPercent?: boolean;
    clickable?: ClickMode;                 // 'all' | 'backward' | 'none'
}

const DEFAULT_LABELS = ['Dados', 'Documentos', 'Contato', 'Revisar'] as const;

export default function Stepper({
    step,
    labels = DEFAULT_LABELS,
    onStepClick,
    title,
    clickable = 'all',
}: StepperProps) {
    const total = labels.length;
    const clamped = Math.min(Math.max(step, 1), total);
    const pct = total > 1 ? Math.round(((clamped - 1) / (total - 1)) * 100) : 0;

    const canClick = (idx: number) => {
        if (!onStepClick || clickable === 'none') return false;
        if (clickable === 'all') return true;
        return idx <= clamped; // backward: pode voltar, não pular à frente
    };

    return (
        <Wrap aria-label="Progresso do formulário">
            <Header>
                {title ? <Title>{title}</Title> : <span />}
            </Header>

            <StepsRow role="list">
                {labels.map((label, i) => {
                    const idx = i + 1;
                    const done = idx < clamped;
                    const active = idx === clamped;
                    const clickableItem = canClick(idx);

                    const handleClick = () => {
                        if (clickableItem && onStepClick) {
                            onStepClick(idx);
                            try { window?.scrollTo({ top: 0, behavior: 'smooth' }); } catch { }
                        }
                    };

                    const connectorState: 'done' | 'active' | 'todo' =
                        i === labels.length - 1
                            ? 'todo'
                            : (i + 1) < clamped - 0 ? 'done' : (i + 1) === clamped ? 'active' : 'todo';

                    return (
                        <React.Fragment key={String(label)}>
                            <StepItem
                                role={onStepClick ? 'button' : 'listitem'}
                                aria-current={active ? 'step' : undefined}
                                aria-disabled={clickableItem ? undefined : true}
                                tabIndex={onStepClick ? 0 : -1}
                                data-active={active || undefined}
                                data-done={done || undefined}
                                data-clickable={clickableItem || undefined}
                                onClick={handleClick}
                                onKeyDown={(e) => {
                                    if ((e.key === 'Enter' || e.key === ' ') && clickableItem) {
                                        e.preventDefault();
                                        handleClick();
                                    }
                                }}
                            >
                                <Dot data-state={done ? 'done' : active ? 'active' : 'todo'}>
                                    {done ? (
                                        <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                                            <path d="M4.7 8.3 2.7 6.3l-.9.9L4.7 10l5.5-5.5-.9-.9-4.6 4.7z" fill="currentColor" />
                                        </svg>
                                    ) : (
                                        <span>{idx}</span>
                                    )}
                                </Dot>
                                <Label>{label}</Label>
                            </StepItem>

                            {i < labels.length - 1 && (
                                <Connector aria-hidden="true" data-state={connectorState} />
                            )}
                        </React.Fragment>
                    );
                })}
            </StepsRow>
        </Wrap>
    );
}
