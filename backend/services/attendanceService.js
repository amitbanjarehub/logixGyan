const attendanceModel = require("../model/attendance.model");
const UserBankAccount = require("../model/user_bank_account.model");
const userModel = require("../model/user.model");
const branchModel = require("../model/branch.model");
const { Sequelize } = require("sequelize");
const op = Sequelize.Op;
const moment = require("moment");
const haversine = require("haversine-distance");

module.exports.checkIn = (body) => {
    return new Promise(async (resolve, reject) => {
        try {

            const today = moment();
            const todayDate = today.format("YYYY-MM-DD");
            const currentUser = body.user;
            if (body.files.length == 0) {
                resolve({
                    status: 500,
                    message: "Please provide image.",
                });
            }
            const checkAttandance = await attendanceModel.findOne({
                where: { date: todayDate, userId: currentUser.id }
            });
            if (checkAttandance) {
                resolve({
                    status: 500,
                    message: "Your today attandance is already done.",
                });
            } else {
                const branchData = await branchModel.findOne({
                    where: { id: currentUser.branchId },
                });
                //Branch lat long
                var point1 = { lat: branchData.lat, lng: branchData.long };
                //User current lat long
                var point2 = { lat: body.body.lat, lng: body.body.long };
                var haversine_m = haversine(point1, point2); //Results in meters (default)
                var haversine_km = haversine_m / 1000; //Results in kilometers
                console.log("distance (in meters): " + haversine_m + "m");
                console.log("distance (in kilometers): " + haversine_km + "km");
                if (haversine_m < 1000) {
                    const data = body.files;
                    const attendanceData = {
                        userId: currentUser.id,
                        date: todayDate,
                        checkInTime: moment().format("HH:mm:00"),
                        branchId: currentUser.branchId,
                        meterStartNumber: body.body.meterStartNumber,
                        vehicleNo: body.body.vehicleNo,
                    };
                    data.forEach((element) => {
                        if (element.fieldname == "checkInselfie") {
                            attendanceData.checkInselfie = element.filename;
                        }
                        if (element.fieldname == "meterStart") {
                            attendanceData.meterStart = element.filename;
                        }
                    });
                    const addAttendance = await attendanceModel.create(attendanceData);
                    if (addAttendance) {
                        resolve({
                            status: 200,
                            message: "CheckIn successfully.",
                        });
                    } else {
                        resolve({
                            status: 409,
                            message: "Error.",
                        });
                    }
                } else {
                    resolve({
                        status: 400,
                        message: "Your not in range of office.",
                    });
                }
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: "Something went wrong.",
            });
        }
    });
};

module.exports.checkOut = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = body.user;
            if (body.files.length == 0) {
                resolve({
                    status: 500,
                    message: "Please provide image.",
                });
            }
            const branchData = await branchModel.findOne({
                where: { id: currentUser.branchId },
            });
            //Branch lat long
            var point1 = { lat: branchData.lat, lng: branchData.long };
            //User current lat long
            var point2 = { lat: body.body.lat, lng: body.body.long };
            var haversine_m = haversine(point1, point2); //Results in meters (default)
            var haversine_km = haversine_m / 1000; //Results in kilometers
            console.log("distance (in meters): " + haversine_m + "m");
            console.log("distance (in kilometers): " + haversine_km + "km");
            if (haversine_m < 1000) {
                const today = moment();
                const userAttandence = await attendanceModel.findOne({
                    where: {
                        [op.and]: [
                            { userId: currentUser.id },
                            { date: today.format("YYYY-MM-DD") },
                        ],
                    },
                });
                if (userAttandence) {
                    const data = body.files;
                    const attendanceData = {
                        checkOutTime: moment().format("HH:mm:00"),
                        meterEndNumber: body.body.meterEndNumber

                    };
                    data.forEach((element) => {
                        if (element.fieldname == "checkOutselfie") {
                            attendanceData.checkOutselfie = element.filename;
                        }
                        if (element.fieldname == "meterEnd") {
                            attendanceData.meterEnd = element.filename;
                        }
                    });
                    const addAttendance = await attendanceModel.update(attendanceData, {
                        where: { id: userAttandence.id },
                    });
                    if (addAttendance) {
                        resolve({
                            status: 200,
                            message: "CheckOut successfully.",
                        });
                    } else {
                        resolve({
                            status: 409,
                            message: "Error.",
                        });
                    }
                } else {
                    resolve({
                        status: 409,
                        message: "Error.",
                    });
                }
            } else {
                resolve({
                    status: 400,
                    message: "Your not in range of office.",
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: "Something went wrong.",
            });
        }
    });
};

module.exports.attendanceList = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Data = [];
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const sortby = order_type + order_by;
            const branchId = params.branchId ? params.branchId : "";
            const userId = params.userId ? params.userId : "";
            const date = params.date ? params.date : "";
            const startDate = params.startDate ? params.startDate : "";
            const endDate = params.endDate ? params.endDate : "";
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            if (branchId != "") {
                filterData.where.branchId = branchId;
            }
            if (date != "") {
                filterData.where.date = date;
            }
            if (userId != "") {
                filterData.where.userId = userId;
            }
            if (startDate && endDate) {
                filterData.where.date = {
                    [op.and]: [{
                        [op.gte]: startDate,
                    },
                    {
                        [op.lte]: endDate,
                    },
                    ],
                };
            }
            const DataCount = await attendanceModel.count(filterData);
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getAttendance = await attendanceModel.findAll(filterData);
            if (getAttendance.length > 0) {
                for (let userLIst of getAttendance) {
                    const getUser = await userModel.findOne({
                        where: { id: userLIst.userId },
                    });
                    const BankDetails = await UserBankAccount.findOne({
                        where: { userId: userLIst.userId },
                    });
                    const data = {
                        id: userLIst.id,
                        userId: userLIst.userId,
                        date: userLIst.date,
                        checkInTime: userLIst.checkInTime,
                        vehicleNo: userLIst.vehicleNo,
                        checkOutTime: userLIst.checkOutTime,
                        branchId: userLIst.branchId,
                        checkInselfie: userLIst.checkInselfie,
                        checkOutselfie: userLIst.checkOutselfie,
                        meterStart: userLIst.meterStart,
                        meterEnd: userLIst.meterEnd,
                        userName: getUser.name,
                        userRole: getUser.role,
                        userMobile: getUser.mobileNumber,
                        userPanNumber: getUser.panNumber,
                        userAccountNumber: getUser.accountNumber,
                        userIfscCode: getUser.ifscCode,
                        userUpiId: getUser.upiId,
                        userSalary: getUser.salary,
                        BankDetails: BankDetails,
                        meterStartNumber: userLIst.meterStartNumber,
                        meterEndNumber: userLIst.meterEndNumber,
                        usertravellingAllowance: getUser.travellingAllowance,
                        dailyFuel: userLIst.meterEndNumber - userLIst.meterStartNumber,
                    }
                    Data.push(data)
                }
                resolve({
                    count: DataCount,
                    status: 200,
                    data: Data,
                    message: "success",
                });
            } else {
                resolve({
                    count: 0,
                    data: [],
                    status: 200,
                    message: "No record found",
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: "Something went wrong.",
            });
        }
    });
};

module.exports.monthlyAttandance = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userId = params.userId;
            const branchId = params.branchId;
            const startDate = params.startDate;
            const endDate = params.endDate;
            const getAttendance = await attendanceModel.findAll({
                where: {
                    branchId: branchId,
                    userId: userId,
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + startDate + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + endDate + "'"
                        )
                    }
                    ]
                },
            });
            if (getAttendance.length > 0) {
                resolve({
                    count: getAttendance.length,
                    status: 200,
                    data: getAttendance,
                    message: "success",
                });
            } else {
                resolve({
                    count: 0,
                    data: [],
                    status: 200,
                    message: "No record found",
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: "Something went wrong.",
            });
        }
    });
};