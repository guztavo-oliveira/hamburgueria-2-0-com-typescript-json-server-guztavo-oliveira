import axios from "axios";

const api = axios.create({
  baseURL: "https://hamburgueria-v2.herokuapp.com/",
});

export default api;
