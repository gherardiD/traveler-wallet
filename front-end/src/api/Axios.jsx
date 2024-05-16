import axios from "axios";

const Axios = axios.create({
  baseURL: `https://traveler-wallet-server.onrender.com/api`,
});

export default Axios;
