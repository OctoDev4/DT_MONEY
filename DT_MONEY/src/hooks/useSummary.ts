import { useContext } from "react"; // Importa o hook useContext do React para acessar o contexto
import { TransactionsContext } from "../contexts/TransactionsContext"; // Importa o contexto TransactionsContext para obter informações sobre as transações

// Hook personalizado useSummary para calcular o resumo das transações
export function useSummary() {
  const { transactions } = useContext(TransactionsContext); // Obtém as transações do contexto TransactionsContext

  // Utiliza a função reduce para calcular o resumo das transações
  const summary = transactions.reduce((accumulator, transaction) => {
    // Verifica se a transação é uma entrada (income) ou saída (outcome) e atualiza o resumo
    if (transaction.type === "income") {
      accumulator.income += transaction.price; // Adiciona o valor da transação à entrada
      accumulator.total += transaction.price; // Adiciona o valor da transação ao total
    } else {
      accumulator.outcome += transaction.price; // Adiciona o valor da transação à saída
      accumulator.total -= transaction.price; // Subtrai o valor da transação do total
    }

    return accumulator; // Retorna o acumulador atualizado
  }, {
    income: 0, // Inicializa o valor de entrada como 0
    outcome: 0, // Inicializa o valor de saída como 0
    total: 0 // Inicializa o total como 0
  });

  return summary; // Retorna o resumo das transações
}
