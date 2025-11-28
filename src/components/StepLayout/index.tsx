'use client';
import Stepper from '@/components/Stepper';
import Button from '@/components/Button';
import { Actions, Card, Header, Title } from './styles';
import Link from 'next/link';

type Props = {
    step: 1 | 2 | 3 | 4;
    title: string;
    nextHref?: string;
    prevHref?: string;
    children?: React.ReactNode;
};

export default function StepLayout({ step, title, nextHref, prevHref, children }: Props) {
    return (
        <>
            <Stepper step={step} />
            <Card>
                <Header><Title>{title}</Title><span>Etapa {step} de 5</span></Header>
                <div>{children}</div>
                <Actions>
                    {prevHref && (
                        <Link href={prevHref}><Button style={{ background: '#e5e7eb', color: '#111827' }}>Anterior</Button></Link>
                    )}
                    {nextHref && (
                        <Link href={nextHref}><Button>Continuar</Button></Link>
                    )}
                </Actions>
            </Card>
        </>
    );
}
