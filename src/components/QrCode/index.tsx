'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

type Props = {
    value: string;
    size?: number;               // px
    ecl?: 'L' | 'M' | 'Q' | 'H'; // nível de correção
    bgColor?: string;
    fgColor?: string;
    className?: string;
};

export default function QrCode({
    value,
    size = 260,
    ecl = 'M',
    bgColor = '#ffffff',
    fgColor = '#000000',
    className
}: Props) {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!ref.current || !value) return;
        QRCode.toCanvas(ref.current, value, {
            errorCorrectionLevel: ecl,
            width: size,
            margin: 2,
            color: { dark: fgColor, light: bgColor },
            version: 3,
        });
    }, [value, size, ecl, bgColor, fgColor]);

    return <canvas ref={ref} width={size} height={size} className={className} aria-label="QR Code" />;
}
