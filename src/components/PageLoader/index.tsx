'use client';
import Image from 'next/image';

type Props = { text?: string };

export default function PageLoader({ text = 'Carregando…' }: Props) {
    return (
        <div
            aria-live="polite"
            aria-busy="true"
            className="app-loader-overlay"
            role="status"
        >
            <div className="passport-loader">
                <Image src="/passport.svg" alt="Passaporte" width={120} height={120} />
                <div className="plane">
                    <Image src="/plane.svg" alt="Avião" width={60} height={60} />
                </div>
            </div>
            <span className="loader-text">{text}</span>
        </div>
    );
}
