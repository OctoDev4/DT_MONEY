import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./style";
import {priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";


export function Summary(){

 

  const summary = useSummary()


  return(
    <SummaryContainer>

      <SummaryCard>
        <header>
          <span>entradas</span>
          <ArrowCircleUp size={32} color="#00b37e"/>


        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
        
      </SummaryCard>


      <SummaryCard>
        <header>
          <span>saídas</span>
          <ArrowCircleDown size={32} color="#f75a68"/>


        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
        </SummaryCard>
      
      
      <SummaryCard variant="green">
        <header>
          <span>total</span>
          <CurrencyDollar size={32} color="#ffff"/>
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}