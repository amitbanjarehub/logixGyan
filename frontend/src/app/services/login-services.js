import { ArrowForwardIosOutlined } from "@material-ui/icons";
import axios from "./config";

const loginServices = {};

loginServices.login = async (creds) => {
  try {
    const response = await axios.post("/api/login", creds);

    if (response.status === 200) {
      return response;
    }

    throw Error(response.data);
  } catch (error) {

    return error;
  }


};



export { loginServices };
