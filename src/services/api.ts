import axios from "axios";

const api = axios.create({
  baseURL: "https://antecipacao-recebiveis.onrender.com",
});


export default api;

