import { Header } from "../../components/Header";
import { SearchForm } from "./SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighLight, TransactionsTable, TrasanctionsContainer } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
    // Obtém as transações do contexto TransactionsContext
    const transactions = useContextSelector(TransactionsContext, (context) => context.transactions);
    
    // Renderiza a página de transações
    return (
        <div>
            <Header /> {/* Componente Header */}
            <Summary /> {/* Componente Summary */}
            <TrasanctionsContainer> {/* Container para transações */}
                <SearchForm /> {/* Componente SearchForm */}
                <TransactionsTable> {/* Tabela de transações */}
                    <tbody>
                        {/* Mapeia as transações e renderiza cada uma */}
                        {transactions.map(transaction => (
                            <tr key={transaction.id}> {/* Chave única para cada transação */}
                                <td width="50%">{transaction.description}</td> {/* Descrição da transação */}
                                <td>
                                    <PriceHighLight variant={transaction.type}>
                                        {transaction.type === "outcome" && "- "}{priceFormatter.format(transaction.price)}
                                    </PriceHighLight>
                                </td> {/* Destaque de preço com formatação */}
                                <td>{transaction.category}</td> {/* Categoria da transação */}
                                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td> {/* Data de criação da transação */}
                            </tr>
                        ))}
                    </tbody>
                </TransactionsTable>
            </TrasanctionsContainer>
        </div>
    );
}
