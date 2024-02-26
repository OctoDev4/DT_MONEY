import { ReactNode, useCallback, useEffect, useState } from "react"; // Importa os hooks necessários do React
import { api } from "../lib/axios"; // Importa a instância da API axios
import { createContext } from "use-context-selector"; // Importa a função createContext do use-context-selector

// Interface que define a estrutura de uma transação
interface Transaction {
  id: string;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

// Interface que define a estrutura dos dados para criar uma nova transação
interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

// Interface que define o tipo de contexto que será fornecido pelo componente TransactionProvider
interface TransactionsContextType {
  transactions: Transaction[]; // Lista de transações
  fetchTransactions: (query?: string) => Promise<void>; // Função para buscar transações
  createTransaction: (data: CreateTransactionInput) => Promise<void>; // Função para criar uma nova transação
}

// Propriedades aceitas pelo componente TransactionProvider
interface TransactionsProviderProps {
  children: ReactNode; // Componentes filhos que serão envolvidos pelo TransactionProvider
}

// Criação do contexto para gerenciar as transações
export const TransactionsContext = createContext({} as TransactionsContextType);

// Componente TransactionProvider responsável por prover o contexto de transações para toda a aplicação
export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Estado para armazenar as transações

  // Função assíncrona para buscar as transações da API
  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get("transactions", {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query
        },
      });

      setTransactions(response.data); // Atualiza o estado com as transações obtidas da API
    },
    []
  );

  // Efeito colateral que dispara a busca das transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Função assíncrona para criar uma nova transação
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, type, category, price } = data;
      const response = await api.post("transactions", {
        description: description,
        type: type, 
        category: category,
        price: price,
        createdAt: new Date(), // Define a data de criação como a data atual
      });
      setTransactions(state => [response.data, ...state]); // Adiciona a nova transação ao estado
    },
    []
  );

  // Retorna o contexto e seus valores para os componentes filhos
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children} {/* Renderiza os componentes filhos */}
    </TransactionsContext.Provider>
  );
}
//useCallback(). O useCallback() é utilizado para garantir que as funções fetchTransactions e createTransaction não sejam recriadas a cada renderização do componente, otimizando assim o desempenho. Ele memoiza a função, retornando a mesma instância da função sempre que os deps (dependências) não mudam. Isso é especialmente útil quando essas funções são passadas como props para componentes filhos, pois evita que os componentes filhos sejam renderizados novamente sem necessidade.