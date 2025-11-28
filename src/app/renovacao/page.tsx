// app/solicitacao/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { FormProvider, useFormFunnel } from '@/context/FormProvider';
import Step1 from '@/features/solicitacao/steps/Step1';
import Step2 from '@/features/solicitacao/steps/Step2';
import Step3 from '@/features/solicitacao/steps/Step3';
import Step4 from '@/features/solicitacao/steps/Step4';
import FunnelHeader from '@/components/FunnelHeader';

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
                title="Renovação do Passaporte"
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
    return (
        <main>
            <FormProvider>
                <FunnelLayout />
            </FormProvider>
        </main>
    );
}
