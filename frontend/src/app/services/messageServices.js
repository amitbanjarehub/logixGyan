import { PermPhoneMsgSharp } from "@mui/icons-material";
import axios from "./config";


messageServices.addMessage = async (msg) => {
    const { data } = await axios.post("/api/addMessage", msg);
    return data;
  };
  

  export  {messageServices};