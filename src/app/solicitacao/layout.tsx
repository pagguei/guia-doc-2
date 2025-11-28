'use client';

import React from 'react';
import { FormProvider } from '@/context/FormProvider'; // ajuste o nome/export conforme seu arquivo
// Se o export for default: import FormProvider from '@/context/FormProvider';

export default function SolicLayout({ children }: { children: React.ReactNode }) {
    return <FormProvider>{children}</FormProvider>;
}
