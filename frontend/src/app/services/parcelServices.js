import axios from "./config";

const parcelServices = {};

parcelServices.add = async (aParcel) => {
  const { data } = await axios.post("/api/addParcel", aParcel);
  return data;
};

parcelServices.rlist = async (date, branchId) => {
  const { data } = await axios.get(
    `/api/dateByParcel?date=${date}&branchId=${branchId}`
  );
  console.log("branchID API", branchId);
  return data;
};

parcelServices.ilist = async (pId) => {
  const { data } = await axios.get(`/api/dateByParcel?id=${pId}`);
  return data;
};

parcelServices.recUpdate = async (uParcel) => {
  const { data } = await axios.put(`/api/updateParcel/${uParcel.pId}`, uParcel);
  return data;
};

parcelServices.allot = async (allotParcel) => {
  const { data } = await axios.post("/api/parcelAllot", allotParcel);
  return data;
};

parcelServices.update = async (uParcel) => {

  const { data } = await axios.put(`/api/updateAllotedParcel/${uParcel.parcelId}`, uParcel);
  return data;
};


parcelServices.alist = async (date, branchId) => {
  const { data } = await axios.get(
    `/api/parcelAllotList?date=${date}&branchId=${branchId}`
  );
  return data;
};

parcelServices.dlist = async (userId, date) => {
  const { data } = await axios.get(`/api/parcelAllotList?userId=${userId}&date=${date}`);
  return data;
};

parcelServices.pIdlist = async (id) => {
  const { data } = await axios.get(`/api/parcelAllotList?id=${id}`);
  return data;
};

parcelServices.report = async (branchId, FirstDay, LastDay) => {
  const { data } = await axios.get(`/api/parcelAllotList?branchId=${branchId}&startDate=${FirstDay}&endDate=${LastDay}`
  );
  return data;
};

parcelServices.receivedParcel = async (branchId, FirstDay, LastDay) => {
  const { data } = await axios.get(`/api/dateByParcel?branchId=${branchId}&startDate=${FirstDay}&endDate=${LastDay}`
  );
  return data;
};

parcelServices.pIdAllotlist = async (id) => {
  const { data } = await axios.get(`/api/detailsAllotedPrcel/${id}`);
  return data;
};


export { parcelServices };
