import "styled-components"; // Importa o módulo "styled-components" para estender seus tipos
import { DefaultThemeType } from "../styles/themes/default"; // Importa o tipo do tema padrão da aplicação

// Declaração do módulo para estender o tipo do tema padrão do styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends DefaultThemeType {} // Sobrescreve o tipo do tema padrão com o tipo personalizado da aplicação
}
