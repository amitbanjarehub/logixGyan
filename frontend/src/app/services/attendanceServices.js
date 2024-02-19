import axios from "./config";

const attendanceService = {};

attendanceService.checkIn = async (checkIn) => {
  console.log(checkIn);
  const formData = new FormData();
  for (let i in checkIn) {
    formData.append(i, checkIn[i]);
  }
  const { data } = await axios.post("/api/checkIn", formData);
  return data;
};

attendanceService.checkOut = async (checkOut) => {
  console.log(checkOut);
  const formData = new FormData();
  for (let i in checkOut) {
    formData.append(i, checkOut[i]);
  }
  const { data } = await axios.post("/api/checkOut", formData);
  return data;
};

attendanceService.list = async (userId, date) => {
  const { data } = await axios.get(
    `/api/attendanceList?userId=${userId}&date=${date}`
  );
  return data;
};

attendanceService.vlist = async (branchId, startDay, lastDay) => {
  const { data } = await axios.get(
    `/api/attendanceList?branchId=${branchId}&startDate=${startDay}&endDate=${lastDay}`

  );
  return data;
};


export { attendanceService };
