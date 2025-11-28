"use client";

import { useEffect } from "react";

export default function HydrateClient() {
    useEffect(() => {
        const d = document.documentElement;
        // (opcional) tema sem piscar — seguro porque só altera classe do <html>
        try {
            const t = localStorage.getItem("theme");
            if (t === "dark" || (t === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                d.classList.add("dark");
            } else {
                d.classList.remove("dark");
            }
        } catch { }

        // sinaliza que o app está hidratado → CSS faz o loader sumir
        d.classList.remove("preload", "show-loader");
        d.classList.add("hydrated");
    }, []);

    return null;
}
