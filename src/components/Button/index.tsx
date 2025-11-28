'use client';
import { Btn } from './styles';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: PropsWithChildren<Props>) {
    return <Btn {...props}>{children}</Btn>;
}
