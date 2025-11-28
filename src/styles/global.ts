'use client';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial;
    color: ${({ theme }) => (theme as any).colors.fg};
    background: ${({ theme }) => (theme as any).colors.bg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Evita FOUC: mantém só o app invisível até hidratar, loader aparece no lugar */
  html.preload #app-root { visibility: hidden; }
  html.hydrated #app-root { visibility: visible; }
  html.hydrated #app-loader { display: none; }

#app-loader {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: hsl(220 90% 56%);
  color: #fff;
  z-index: 99999;
}

.passport-loader {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.passport-icon {
  z-index: 2;
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.3));
}

/* Avião orbitando */
.plane {
  position: absolute;
  top: 30%;
  left: 30%;
  transform-origin: -50px center; /* raio da órbita */
  animation: orbit 2.5s linear infinite;
}

@keyframes orbit {
  0%   { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
}

.loader-text {
  margin-top: 16px;
  font-size: 14px;
  letter-spacing: 0.5px;
  opacity: 0.9;
  font-weight: 800;
}

`;
