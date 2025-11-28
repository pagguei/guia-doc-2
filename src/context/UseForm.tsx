"use client";

// Adapter que expõe a API esperada pelo Step3 (useForm)
// e aproveita o seu FormProvider atual (useFormFunnel).
// Mantém os erros localmente (por componente) e fornece validateStep3.

import { useMemo, useState } from "react";
import type { Step, FormData } from "../types/form";
import { useFormFunnel } from "./FormProvider";

// Defaults para evitar undefined em telas novas
const defaultDocuments = {
    cpf: "",
    docType: "RG",
    docNumber: "",
    issuingBody: "",
    issuingUF: "",
    passportSituation: "never_had",
    series: "",
};

const defaultContact = {
    email: "",
    emailConfirm: "",
    phone: "",
    cep: "",
    state: "",
    city: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
};

// Tipagem leve para erros
export type FormErrors = {
    documents?: Partial<Record<keyof typeof defaultDocuments, string>>;
    contact?: Partial<Record<keyof typeof defaultContact, string>>;
    termsAccepted?: string;
};

export function useForm() {
    const { state, update, goto } = useFormFunnel();

    // Garante shape com defaults sem mutar o estado global
    const data = useMemo<FormData & { documents: typeof defaultDocuments; contact: typeof defaultContact }>(
        () => ({
            ...(state.data as any),
            documents: { ...defaultDocuments, ...(state.data as any)?.documents },
            contact: { ...defaultContact, ...(state.data as any)?.contact },
        }),
        [state.data]
    );

    const [errors, setErrors] = useState<FormErrors>({});

    const patch = (partial: Partial<FormData>) => update(partial);
    const setStep = (s: Step) => goto(s);

    function validateStep3() {
        const c = (data as any).contact || defaultContact;
        const e: FormErrors = { contact: {} };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!c.email || !emailRegex.test(c.email)) e.contact!.email = "E-mail inválido";
        if (!c.emailConfirm || c.emailConfirm !== c.email) e.contact!.emailConfirm = "E-mails não conferem";

        const phoneDigits = String(c.phone || "").replace(/\D/g, "");
        if (phoneDigits.length < 10) e.contact!.phone = "Telefone inválido";

        const cepDigits = String(c.cep || "").replace(/\D/g, "");
        if (cepDigits.length !== 8) e.contact!.cep = "CEP inválido";

        if (!c.state) e.contact!.state = "UF obrigatória";
        if (!c.city) e.contact!.city = "Cidade obrigatória";
        if (!c.street) e.contact!.street = "Logradouro obrigatório";
        if (!c.number) e.contact!.number = "Número obrigatório";
        if (!c.neighborhood) e.contact!.neighborhood = "Bairro obrigatório";

        setErrors(e);
        return !Object.values(e.contact!).some(Boolean);
    }

    return {
        data,
        patch,
        errors,
        setErrors,
        validateStep3,
        setStep,
    } as const;
}
