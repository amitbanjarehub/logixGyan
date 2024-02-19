import axios from "./config";

const cashDepositServices = {};

cashDepositServices.addCash = async (addCash) => {
  console.log(addCash);
  const formData = new FormData();
  for (let i in addCash) {
    formData.append(i, addCash[i]);
  }
  const { data } = await axios.post("/api/addCash", formData);
  return data;
};


cashDepositServices.list = async (branchId, FirstDay, LastDay) => {
  const { data } = await axios.get(`/api/cashList?branchId=${branchId}&startDate=${FirstDay}&endDate=${LastDay}`
  );
  return data;
};


cashDepositServices.Idlist = async (id) => {
  const { data } = await axios.get(
    `/api/cashList?id=${id}`
  );
  return data;
};


cashDepositServices.updateCashDeposit = async (uData) => {

  const formData = new FormData();
  for (let i in uData) {
    formData.append(i, uData[i]);
  }
  const { data } = await axios.put(`/api/updateCash/${uData.eId}`, formData);
  console.log("uData", uData)
  return data;
};

export { cashDepositServices };
