import { ThemeProvider } from 'styled-components'; // Importa o ThemeProvider do pacote styled-components para aplicar temas ao estilo
import { DefaultTheme } from './styles/themes/default'; // Importa o tema padrão da aplicação
import { GlobalStyle } from './styles/global'; // Importa o estilo global da aplicação
import { Transactions } from './pages/transactions'; // Importa o componente Transactions da página transactions
import { TransactionProvider } from './contexts/TransactionsContext'; // Importa o provedor de contexto para transações

// Componente principal da aplicação
export function App() {
  return (
    // Utiliza o ThemeProvider para aplicar o tema padrão à aplicação
    <ThemeProvider theme={DefaultTheme}>
      {/* Utiliza o TransactionProvider para fornecer o contexto de transações aos componentes filhos */}
      <TransactionProvider>
        {/* Renderiza o componente Transactions, que é a página principal da aplicação */}
        <Transactions />
      </TransactionProvider>
      
      {/* Aplica o estilo global à aplicação */}
      <GlobalStyle />
    </ThemeProvider>
  );
}
