// Define um objeto `dateFormatter` que formata datas de acordo com a localidade "pt-BR"
export const dateFormatter = new Intl.DateTimeFormat("pt-BR");

// Define um objeto `priceFormatter` que formata valores numéricos como moeda brasileira (BRL)
export const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency", // Define o estilo de formatação como moeda
  currency: "BRL" // Define a moeda como Real brasileiro (BRL)
});
