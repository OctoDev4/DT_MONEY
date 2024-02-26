import { NewTransactionModal } from "../NewTransactionModal";
import { HeadeContent, HeaderContainer, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog"

export function Header(){
    return(
       <HeaderContainer>
        <HeadeContent>
            <p>logo</p>
          <Dialog.Root>
            <Dialog.DialogTrigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.DialogTrigger>

           <NewTransactionModal/>
          
          </Dialog.Root>
        </HeadeContent>
       </HeaderContainer>
    )
}