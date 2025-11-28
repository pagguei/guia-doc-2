// app/solicitacao/page.tsx
'use client';
import FunnelHeader from '@/components/FunnelHeader';
import { FormProvider, useFormFunnel } from '@/context/FormProvider';
import Step1 from '@/features/solicitacao/steps/Step1';
import Step2 from '@/features/solicitacao/steps/Step2';
import Step3 from '@/features/solicitacao/steps/Step3';
import Step4 from '@/features/solicitacao/steps/Step4';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function RouterByStep() {
    const { state } = useFormFunnel();
    return (
        <>
            {state.step === 1 && <Step1 />}
            {state.step === 2 && <Step2 />}
            {state.step === 3 && <Step3 />}
            {state.step === 4 && <Step4 />}
        </>
    );
}

function FunnelLayout() {
    const router = useRouter();
    const { state, goto } = useFormFunnel();
    const total = 4;

    return (
        <>
            <FunnelHeader
                title="Primeira Via do Passaporte"
                step={state.step}
                totalSteps={total}
                clickable="backward"                 // só permite voltar
                onBack={() => router.push("/")} // volta para home
                onStepClick={(idx) => {
                    if (idx <= state.step) {
                        const safe = Math.max(1, Math.min(total, idx)) as 1 | 2 | 3 | 4;
                        goto(safe);
                    }
                }}
            />

            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 16px' }}>
                <RouterByStep />
            </div>
        </>
    );
}

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // call server-side check to support client-side navigation
        let mounted = true;
        (async () => {
            try {
                const res = await fetch('/api/solicitacao-check', { cache: 'no-store' });
                if (!mounted) return;
                if (!res.ok) return;
                const data = await res.json();
                if (data?.redirect && data.destination) {
                    // force full navigation to ensure server behaviour when needed
                    window.location.replace(data.destination);
                }
            } catch {
                // silent fail: allow page to load
            }
        })();
        return () => { mounted = false; };
    }, [router]);
    return (
        <main>
            <FormProvider>
                <FunnelLayout />
            </FormProvider>
        </main>
    );
}
