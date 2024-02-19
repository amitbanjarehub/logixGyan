import axios from "./config";

const dashboardServices = {};

dashboardServices.count = async (dcount) => {
    const { data } = await axios.get("/api/DashboardCount", dcount);
    return data;
};

export { dashboardServices };
