import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
  query: z.string(), // O campo "query" deve ser uma string
});

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions  = useContextSelector(TransactionsContext,(context)=>{
    return context.fetchTransactions
  });

  const { handleSubmit, register } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = async (data: SearchFormInput) => {
    try {
      await fetchTransactions(data.query);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>   
      <input
        type="text"
        placeholder="Busque por Transações"
        {...register("query")}
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
