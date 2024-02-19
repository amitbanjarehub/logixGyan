import axios from "./config";

const companyServices = {};

companyServices.add = async (acomp) => {
  const { data } = await axios.post("/api/addCompany", acomp);
  return data;
};

companyServices.list = async (page) => {
  const { data } = await axios.get(`/api/companyList?pageNumber=${page}`);
  return data;
};

companyServices.details = async (cId) => {
  const { data } = await axios.get(`/api/companyDetails/${cId}`);
  return data;
};

companyServices.wList = async (Listcomp) => {
  const { data } = await axios.get("/api/companyList", Listcomp);
  return data;
};

export { companyServices };
