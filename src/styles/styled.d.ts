/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // Faz o DefaultTheme herdar o seu AppTheme
  export interface DefaultTheme extends AppTheme {}
}
