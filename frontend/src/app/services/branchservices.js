import axios from "./config";

const branchServices = {};

branchServices.add = async (abranch) => {
  const { data } = await axios.post("/api/addBranch", abranch);
  return data;
};

branchServices.list = async (libranch) => {
  const { data } = await axios.get("/api/branchList", libranch);
  return data;
};
branchServices.addBranchExpenses = async (addBranchExpenses) => {
  console.log(addBranchExpenses);
  const formData = new FormData()
  for (let i in addBranchExpenses) {
    formData.append(i, addBranchExpenses[i])
  }
  const { data } = await axios.post("/api/addExpences", formData);
  return data;
};

branchServices.elist = async (date, branchId) => {
  const { data } = await axios.get(
    `/api/getExpencesList?date=${date}&branchId=${branchId}`
  );
  return data;
};

branchServices.explist = async (id) => {
  const { data } = await axios.get(
    `/api/getExpencesList?id=${id}`
  );
  return data;
};

branchServices.expenseslist = async (branchId, FirstDay, LastDay) => {
  const { data } = await axios.get(`/api/getExpencesList?branchId=${branchId}&startDate=${FirstDay}&endDate=${LastDay}`
  );
  return data;
};

branchServices.updateExpenses = async (uData) => {

  const formData = new FormData();
  for (let i in uData) {
    formData.append(i, uData[i]);
  }
  const { data } = await axios.put(`/api/updateExpenses/${uData.eId}`, formData);
  console.log("uData", uData)
  return data;
};

branchServices.deleteExpense = async (uId) => {
  const { data } = await axios.delete(`/api/deleteExpense/${uId}`);
  return data;
};

export { branchServices };
