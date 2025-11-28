'use client';

import { useEffect, useRef } from 'react';

type Props = {
    value: string;
    size?: number;
    ecl?: 'L' | 'M' | 'Q' | 'H';
    logoUrl?: string;        // opcional
    bgColor?: string;        // cor do fundo do QR (geralmente 'transparent' ou '#fff')
};

export default function QrCodeApple({
    value,
    size = 260,
    ecl = 'M',
    logoUrl,
    bgColor = 'transparent',
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const qrRef = useRef<any>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const { default: QRCodeStyling } = await import('qr-code-styling');

            if (!mounted) return;

            const qr = new QRCodeStyling({
                width: size,
                height: size,
                type: 'svg',                         // SVG = nítido em qualquer DPI
                data: value,
                margin: 12,                          // quiet zone
                qrOptions: { errorCorrectionLevel: ecl },
                backgroundOptions: { color: bgColor },
                // Pontinhos arredondados + gradiente estilo Apple
                dotsOptions: {
                    type: 'rounded',                   // 'dots', 'rounded', 'classy', ...
                    gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: '#333' }, // azul da sua marca
                            { offset: 1, color: '#333' },
                        ],
                    },
                },
                // “olhos” com cantos extra arredondados
                cornersSquareOptions: { type: 'extra-rounded', color: '#333' },
                cornersDotOptions: { type: 'dot', color: '#333' },
                image: logoUrl,
                imageOptions: {
                    margin: 6,
                    hideBackgroundDots: true,          // deixa logo “limpo”
                    imageSize: 0.18,                   // ~18% do QR
                    crossOrigin: 'anonymous',
                },
            });

            qrRef.current = qr;
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                qr.append(containerRef.current);
            }

            // primeira atualização (caso value chegue depois)
            qr.update({ data: value });
        })();

        return () => { mounted = false; };
    }, [size, ecl, bgColor, logoUrl]);

    // atualiza o data se mudar
    useEffect(() => {
        qrRef.current?.update?.({ data: value });
    }, [value]);

    return <div ref={containerRef} aria-label="QR Code" />;
}
