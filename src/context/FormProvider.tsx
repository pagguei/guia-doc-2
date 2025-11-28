'use client';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { FunnelState, Step, FormData } from '@/types/form';

const STORAGE_KEY = 'solicitacao.form.v1';

type Action =
    | { type: 'UPDATE'; payload: Partial<FormData> }
    | { type: 'GOTO'; payload: Step }
    | { type: 'NEXT' }
    | { type: 'PREV' }
    | { type: 'RESET' }
    | { type: 'SET_INVOICE'; payload: string };

function reducer(state: FunnelState, action: Action): FunnelState {
    switch (action.type) {
        case 'UPDATE': return { ...state, data: { ...state.data, ...action.payload } };
        case 'GOTO': return { ...state, step: action.payload };
        case 'NEXT': return { ...state, step: (Math.min(4, (state.step + 1)) as Step) };
        case 'PREV': return { ...state, step: (Math.max(1, (state.step - 1)) as Step) };
        case 'RESET': return { step: 1, data: {}, invoiceCode: undefined };
        case 'SET_INVOICE': return { ...state, invoiceCode: action.payload };
    }
}

const FormCtx = createContext<{
    state: FunnelState;
    update: (patch: Partial<FormData>) => void;
    goto: (s: Step) => void;
    next: () => void;
    prev: () => void;
    reset: () => void;
    setInvoice: (code: string) => void;
} | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
    // inicia sempre no cliente para evitar mismatch
    const [state, dispatch] = useReducer(reducer, { step: 1, data: {} });

    // carrega do localStorage só no cliente
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as FunnelState;
                dispatch({ type: 'UPDATE', payload: parsed.data || {} });
                dispatch({ type: 'GOTO', payload: (parsed.step || 1) as Step });
                if (parsed.invoiceCode) dispatch({ type: 'SET_INVOICE', payload: parsed.invoiceCode });
            }
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // persiste alterações
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { }
    }, [state]);

    const api = useMemo(() => ({
        state,
        update: (patch: Partial<FormData>) => dispatch({ type: 'UPDATE', payload: patch }),
        goto: (s: Step) => dispatch({ type: 'GOTO', payload: s }),
        next: () => dispatch({ type: 'NEXT' }),
        prev: () => dispatch({ type: 'PREV' }),
        reset: () => dispatch({ type: 'RESET' }),
        setInvoice: (code: string) => dispatch({ type: 'SET_INVOICE', payload: code }),
    }), [state]);

    return <FormCtx.Provider value={api}>{children}</FormCtx.Provider>;
}

export function useFormFunnel() {
    const ctx = useContext(FormCtx);
    if (!ctx) throw new Error('useFormFunnel must be used inside <FormProvider>');
    return ctx;
}
