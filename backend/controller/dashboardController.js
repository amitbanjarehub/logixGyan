const Dashboard = require("../services/dashboardService");

module.exports.DashboardCount = async(req, res) => {
    const result = await Dashboard.DashboardCount();
    res.json(result);
};

module.exports.MonthlyCashCount = async(req, res) => {
    const result = await Dashboard.MonthlyCashCount();
    res.json(result);
};

module.exports.dailyCount = async(req, res) => {
    const result = await Dashboard.dailyCount();
    res.json(result);
};