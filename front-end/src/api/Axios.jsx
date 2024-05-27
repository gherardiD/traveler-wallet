import axios from "axios";

const Axios = axios.create({
  baseURL: `https://traveler-wallet-server.onrender.com/api`,
  // baseURL: `http://localhost:3001/api`,
});

export default Axios;
