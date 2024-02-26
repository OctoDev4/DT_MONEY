import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

// Hook personalizado useSummary para calcular o resumo das transações
export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions);

  // Utiliza a função reduce para calcular o resumo das transações
  const summary = useMemo(() => {
    return transactions.reduce((accumulator, transaction) => {
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
  }, [transactions]);

  return summary; // Retorna o resumo das transações
}
//O useMemo é útil em situações em que você precisa calcular um valor derivado de forma computacionalmente custosa e quer evitar que esse cálculo seja feito em todas as renderizações do componente. Aqui estão algumas situações em que o useMemo é especialmente útil: