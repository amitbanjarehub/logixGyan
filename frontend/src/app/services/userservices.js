import axios from "./config";

const userServices = {};

userServices.getCurrentUser = async () => {
  //todo: change path as per your api
  const { data } = await axios.get("/api/userByToken");
  return data.data;
};

//add user
userServices.add = async (auser) => {
  console.log(auser);
  const formData = new FormData();
  for (let i in auser) {
    formData.append(i, auser[i]);
    console.log("formData", formData[i]);
  }
  const { data } = await axios.post("/api/addUser", formData);
  return data;
};

//all user list
userServices.alist = async (aliuser) => {
  const { data } = await axios.get("/api/alluserlist", aliuser);
  return data;
};

//verified user list
userServices.vlist = async (vliuser) => {
  const { data } = await axios.get("/api/verifyUsersList", vliuser);
  return data;
};

//verified user list by branchId
userServices.vblist = async (branchId) => {
  const { data } = await axios.get(`/api/verifyUsersList?branchId=${branchId}`);
  return data;
};

//update user details
userServices.update = async (uuser) => {

  const formData = new FormData();
  for (let i in uuser) {
    formData.append(i, uuser[i]);
  }
  const { data } = await axios.put(`/api/updateUser/${uuser.userId}`, formData);
  return data;
};


//delete user
userServices.delete = async (uId) => {
  const { data } = await axios.delete(`/api/deleteUser/${uId}`);
  return data;
};
//delete expense list row data
userServices.deleteExpense = async (uId) => {
  const { data } = await axios.delete(`/api/deleteExpense/${uId}`);
  return data;
};

//verify user
userServices.bverify = async (vsuser) => {
  const { data } = await axios.put("/api/userVerifySubUser", vsuser);
  return data;
};

userServices.verify = async (vauser) => {
  const { data } = await axios.put("/api/userVerify", vauser);
  return data;
};

//user details
userServices.details = async (userId) => {
  const { data } = await axios.get(`/api/userDetails/${userId}`);
  return data;
};

//Attendace
userServices.attendance = async (branchId, startDate, endDate) => {
  const { data } = await axios.get(
    `/api/attendanceList?branchId=${branchId}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

userServices.Pattendance = async (userId, startDate, endDate) => {
  const { data } = await axios.get(
    `/api/attendanceList?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

userServices.attendancedashboard = async (branchId, date) => {
  const { data } = await axios.get(
    `/api/attendanceList?branchId=${branchId}&date=${date}`
  );
  return data;
};

//block user
userServices.block = async (uId, block) => {
  console.log("userId API", uId)
  const { data } = await axios.put(`/api/blockUser/${uId}`, { isBlock: block });
  return data;
};
export { userServices };
