// components/TermsConfirm.tsx
'use client';
import * as React from 'react';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { A, Box, Helper, Label, Linkish, Required, Row } from './styles';
import { Indicator } from '@radix-ui/react-checkbox';
type Props = {
    checked: boolean;
    onChange: (v: boolean) => void;
    error?: string | null;
    required?: boolean;
    termsHref?: string;
    privacyHref?: string;
    onClickTerms?: () => void;
    onClickPrivacy?: () => void;
};

export function TermsConfirm({
    checked,
    onChange,
    error,
    required,
    termsHref = '/terms',
    privacyHref = '/privacy',
    onClickTerms,
    onClickPrivacy,
}: Props) {
    return (
        <Row as="div" aria-invalid={!!error} data-error={!!error}>
            <Box
                checked={checked}
                onCheckedChange={(v) => onChange(!!v)}
                aria-label="Aceitar Termos"
                id="terms"
            >
                <Indicator>
                    <CheckIcon aria-hidden color='#fff' />
                </Indicator>
            </Box>

            <Label htmlFor="terms">
                Li e concordo com os{' '}
                <Linkish
                    asButton={!!onClickTerms}
                    href={termsHref}
                    onClick={onClickTerms}
                >
                    Termos de Uso
                </Linkish>{' '}
                e a{' '}
                <Linkish
                    asButton={!!onClickPrivacy}
                    href={privacyHref}
                    onClick={onClickPrivacy}
                >
                    Política de Privacidade
                </Linkish>
                {required && <Required> *</Required>}
            </Label>

            {error && (
                <Helper role="alert">
                    <ExclamationTriangleIcon /> {error}
                </Helper>
            )}
        </Row>
    );
}
