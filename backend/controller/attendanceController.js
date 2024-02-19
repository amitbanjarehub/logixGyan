const Attendance = require("../services/attendanceService");

module.exports.checkIn = async (req, res) => {
    const result = await Attendance.checkIn(req);
    res.json(result);
};
module.exports.checkOut = async (req, res) => {
    const result = await Attendance.checkOut(req);
    res.json(result);
};
module.exports.attendanceList = async (req, res) => {
    const result = await Attendance.attendanceList(req.user, req.query);
    res.json(result);
};
module.exports.monthlyAttandance = async (req, res) => {
    const result = await Attendance.monthlyAttandance(req.user, req.query);
    res.json(result);
};