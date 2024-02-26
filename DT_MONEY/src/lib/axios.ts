import axios from "axios"; // Importa o pacote axios para fazer requisições HTTP

// Cria uma instância do axios com uma baseURL definida
export const api = axios.create({
  baseURL: "http://localhost:3000", // Define a URL base para as requisições como http://localhost:3000
});
