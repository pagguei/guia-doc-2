'use client';
import React from 'react';
import { Box, Icon, Text, Title } from './styles';

type Tone = 'info' | 'warn' | 'success' | 'danger';

export default function Notice({
    title,
    children,
    tone = 'info',
    showIcon = true,
}: {
    title?: string;
    children?: React.ReactNode;
    tone?: Tone;
    showIcon?: boolean;
}) {
    const glyph = tone === 'warn' ? '⚠️' : tone === 'success' ? '✅' : tone === 'danger' ? '🚨' : '💡';

    return (
        <Box $tone={tone}>
            {showIcon ? <Icon aria-hidden>{glyph}</Icon> : <span />}
            <div>
                {title && <Title>{title}</Title>}
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </div>
        </Box>
    );
}
