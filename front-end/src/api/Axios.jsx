import axios from "axios";

const Axios = axios.create({
  // SERVER LOCAL
  // baseURL: `http://127.0.0.1:3001/api`,
  // SERVER CODESPACE
  baseURL: "https://jubilant-zebra-gvpw9j7qp74hwjg-3001.app.github.dev/api"
});


export default Axios;
