import { color, mq, radius, shadow, space } from '@/styles/tokens'; // ajuste para o seu path
import styled from 'styled-components';

export const FooterWrap = styled.footer`
  position: relative;
  background: radial-gradient(1200px 400px at 50% -10%, rgba(255,255,255,0.07), transparent),
              ${color.brand};
  color: ${color.bg};
  border-top: 1px solid ${color.border};
  padding:  0 0 ${space(2)} 0;
  `;

export const FootTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1120px;
  margin: 0 auto;
  padding: ${space(3)} ${space(4)};
  border-bottom: 1px solid ${color.border};

  p {
    margin: 0;
    font-size: 14px;
    a {
      color: ${color.bg};
      font-weight: 600;
      border-bottom: 1px dashed transparent;
    }
    a:hover { border-bottom-color: ${color.borderStrong}; }
  }

  button {
    background: rgba(255,255,255,0.08);
    color: ${color.bg};
    border: 1px solid ${color.border};
    border-radius: ${radius.pill};
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    transition: transform .08s ease, background .2s ease, border-color .2s ease;
  }
  button:hover { background: rgba(255,255,255,0.12); border-color: ${color.borderStrong}; }
  button:active { transform: translateY(1px); }

  ${mq.sm} {
    flex-direction: column;
    gap: ${space(2)};
  }
`;

export const FootGrid = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: ${space(6)} ${space(4)};
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  gap: ${space(7)};

  ${mq.md} { grid-template-columns: 1fr 1fr; }
  ${mq.sm} { grid-template-columns: 1fr; gap: ${space(5)}; }
`;

export const FootCol = styled.div``;

export const Brand = styled.div`
  margin-bottom: ${space(3)};
  img { filter: brightness(0) invert(1); }
`;

export const BrandText = styled.p`
  margin: 0 0 ${space(4)};
  font-size: 14px;
  opacity: .95;
`;

export const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space(2)};
  margin-bottom: ${space(4)};
`;

export const TrustBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${color.border};
  border-radius: ${radius.lg};
  background: rgba(255,255,255,0.06);
  font-size: 12.5px;
  line-height: 1;
  svg { display: block; }
`;

export const ColTitle = styled.h4`
  margin: 0 0 ${space(3)};
  font-size: 14px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: ${color.bg};
  opacity: .9;
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0; margin: 0;
  display: grid; gap: 10px;
`;

export const LinkItem = styled.li`
  a {
    color: ${color.bg};
    text-decoration: none;
    font-size: 14px;
    opacity: .95;
    border-bottom: 1px dashed transparent;
  }
  a:hover { border-bottom-color: ${color.borderStrong}; }
`;

export const Socials = styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${space(2)};
`;

export const SocialLink = styled.a`
  width: 36px; height: 36px;
  border-radius: ${radius.pill};
  display: inline-grid; place-items: center;
  border: 1px solid ${color.border};
  background: rgba(255,255,255,0.06);
  transition: transform .08s ease, background .2s ease, border-color .2s ease;
  svg { color: ${color.bg}; }
  &:hover { background: rgba(255,255,255,0.12); border-color: ${color.borderStrong}; }
  &:active { transform: translateY(1px); }
`;

export const Newsletter = styled.div`
  p { margin: 0 0 ${space(2)}; font-size: 14px; opacity: .95; }
  small { display: block; margin-top: ${space(2)}; opacity: .8; }
`;

export const NewsForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
`;

export const NewsInput = styled.input`
  appearance: none;
  width: 100%;
  background: rgba(255,255,255,0.06);
  color: ${color.bg};
  border: 1px solid ${color.border};
  border-radius: ${radius.lg};
  padding: 10px 12px;
  font-size: 15px;
  outline: none;
  &:focus { border-color: ${color.borderStrong}; box-shadow: ${shadow.md}; }
  &::placeholder { color: rgba(255,255,255,.7); }
`;

export const NewsButton = styled.button`
  background: ${color.bg};
  color: ${color.brand};
  border: 1px solid ${color.bg};
  border-radius: ${radius.lg};
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .08s ease, opacity .2s ease;
  &:hover { opacity: .9; }
  &:active { transform: translateY(1px); }
`;

export const LegalFoot = styled.div`
  border-top: 1px solid ${color.border};
  padding: ${space(3)} ${space(4)};
  display: grid; gap: 6px;
  max-width: 1120px; margin: 0 auto;
  font-size: 12.5px;
  color: ${color.bg};
  opacity: .95;
`;
