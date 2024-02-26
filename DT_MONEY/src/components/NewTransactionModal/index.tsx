// Importações necessárias para o componente
import * as Dialog from "@radix-ui/react-dialog"; // Importa todos os componentes do pacote Dialog
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"; // Importa os componentes de estilo do diretório "./styles"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"; // Importa os ícones ArrowCircleDown, ArrowCircleUp e X do pacote phosphor-react
import * as z from "zod"; // Importa todas as funcionalidades do pacote zod
import { Controller, useForm } from "react-hook-form"; // Importa o Controller e o useForm do pacote react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"; // Importa o zodResolver do pacote @hookform/resolvers/zod
import { useContext } from "react"; // Importa o hook useContext do React
import { TransactionsContext } from "../../contexts/TransactionsContext"; // Importa o contexto TransactionsContext

// Define o schema para validação dos campos do formulário
const newTransactionFormSchema = z.object({
  description: z.string(), // Campo para descrição da transação, do tipo string
  price: z.number(), // Campo para preço da transação, do tipo number
  category: z.string(), // Campo para categoria da transação, do tipo string
  type: z.enum(["income", "outcome"]) // Campo para tipo da transação, que deve ser "income" ou "outcome"
});

// Tipo inferido para os dados do formulário com base no schema definido acima
type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>;

// Componente responsável por renderizar o modal para criar uma nova transação
export function NewTransactionModal() {
  // Utilização do hook useContext para acessar o contexto TransactionsContext
  const { createTransaction } = useContext(TransactionsContext);

  // Utilização do hook useForm para gerenciar o estado do formulário
  const { 
    control, // Referência para o controlador do formulário
    handleSubmit, // Função para tratar a submissão do formulário
    formState: { isSubmitting }, // Estado do formulário, indicando se está sendo submetido
    register // Função para registrar os campos do formulário
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema) // Utiliza o zodResolver para validar os dados do formulário com base no schema definido
  });

  // Função assíncrona para lidar com a criação de uma nova transação
  async function handleCreateNewTransaction(data: NewTransactionFormInput) {
    // Extrai os dados do formulário
    const { category, description, price, type } = data;

    // Chama a função createTransaction do contexto TransactionsContext para criar uma nova transação
    await createTransaction({
      description,
      price,
      category,
      type,
    });

    // Aguarda um tempo (simulação de carregamento) e exibe os dados no console
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    console.log(data); 
  }

  // Renderiza o modal para criar uma nova transação
  return (
    <Dialog.Portal> {/* Portal para renderizar o conteúdo do modal */}
      <Overlay /> {/* Overlay para cobrir a tela do fundo */}
      <Content> {/* Conteúdo do modal */}
        <CloseButton> {/* Botão para fechar o modal */}
          <X size={24} /> {/* Ícone de X para representar o fechamento do modal */}
        </CloseButton>
        <Dialog.DialogTitle> Nova Transção </Dialog.DialogTitle> {/* Título do modal */}
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}> {/* Formulário para criar uma nova transação */}
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")} // Registra o campo "description" do formulário
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })} // Registra o campo "price" do formulário como número
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")} // Registra o campo "category" do formulário
          />

          {/* Componente Controller para controlar o campo "type" do formulário */}
          <Controller
            control={control}
            name="type" // Nome do campo
            render={({ field }) => { // Função de renderização do campo
              return (
                <TransactionType // Componente TransactionType para representar o tipo da transação
                  onValueChange={field.onChange} // Função para lidar com a mudança de valor do campo
                  value={field.value} // Valor do campo
                >
                  <TransactionTypeButton // Botão para selecionar o tipo "income"
                    value="income"
                    variant="income"
                  >
                    <ArrowCircleUp size={24} /> {/* Ícone de seta para cima */}
                    Entrada {/* Texto para representar a entrada */}
                  </TransactionTypeButton>

                  <TransactionTypeButton // Botão para selecionar o tipo "outcome"
                    value="outcome"
                    variant="outcome"
                  >
                    <ArrowCircleDown size={24} /> {/* Ícone de seta para baixo */}
                    Saída {/* Texto para representar a saída */}
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>Cadastrar</button> {/* Botão para submeter o formulário */}
        </form>
      </Content>
    </Dialog.Portal>
  );
}
