const userModel = require("../model/user.model");
const companyModel = require("../model/company.model");
const branchModel = require("../model/branch.model");
const ParcelModel = require("../model/parcel.model");
const parcelAllotModel = require("../model/parcelAllot.model");
const cashModel = require("../model/cash.model");
const expencesModel = require("../model/expences.model");
const attandanceModel = require("../model/attendance.model");
const CashInHand = require("../model/cashInHand.model")
const { Sequelize } = require("sequelize");
const op = Sequelize.Op;
const moment = require("moment");

//current month data for dashboard
module.exports.DashboardCount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const fDay = moment(firstDay).format("YYYY/MM/DD");
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const lDay = moment(lastDay).format("YYYY/MM/DD");
            const totalUserCount = await userModel.count();
            const pendingUserCount = await userModel.count({ where: [{ 'isApproved': "pending" }] });
            const verifyUserCount = await userModel.count({ where: [{ 'isApproved': "verify" }] });
            const basicVerifyUserCount = await userModel.count({ where: [{ 'isApproved': "bacic-verify" }] });
            const totalCompany = await companyModel.count();
            const totalBranch = await branchModel.count();
            const totalPresentUser = await attandanceModel.count({ where: [{ date: Date.now() }] });

            const totalParcalOfMonth = await ParcelModel.count({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
            });
            const totalDeliverdParcel = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("deliverdParcel"), 'integer')), "totalDeliverdParcel"]
                ]
            });
            const totalRejectParcel = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("rejectParcel"), 'integer')), "totalRejectParcel"]
                ]
            });
            const totalReturnedParcel = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("returnedParcel"), 'integer')), "totalReturnedParcel"]
                ]
            });
            const totalRejectParcelAmount = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("rejectAmmount"), 'integer')), "totalRejectParcelAmount"]
                ]
            });
            const totalReturnedParcelAmount = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("returnedAmmount"), 'integer')), "totalReturnedParcelAmount"]
                ]
            });
            const totalCashDiposit = await cashModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("cash"), 'integer')), "totalCashDiposit"]
                ]
            });
            const totalCashAmount = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("totalCashAmmount"), 'integer')), "totalCashAmount"]
                ]
            });
            const totalOnlineAmount = await parcelAllotModel.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("totalOnlineAmmount"), 'integer')), "totalOnlineAmount"]
                ]
            });
            const totalCashInHand = await CashInHand.findAll({
                where: {
                    [op.and]: [{
                        date: Sequelize.literal(
                            "date >= '" + fDay + "'"
                        )
                    },
                    {
                        date: Sequelize.literal(
                            "date <= '" + lDay + "'"
                        )
                    }
                    ]
                },
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("totalCash"), 'integer')), "totalCashInHand"]
                ]
            });
            if (verifyUserCount) {
                resolve({
                    data: {
                        verifyUserCount: verifyUserCount,
                        basicVerifyUserCount: basicVerifyUserCount,
                        totalCompany: totalCompany,
                        totalBranch: totalBranch,
                        pendingUserCount: pendingUserCount,
                        totalPresentUser: totalPresentUser,
                        totalParcalOfMonth: totalParcalOfMonth,
                        totalUserCount: totalUserCount,
                        totalDeliverdParcel: totalDeliverdParcel[0],
                        totalRejectParcel: totalRejectParcel[0],
                        totalReturnedParcel: totalReturnedParcel[0],
                        totalRejectParcelAmount: totalRejectParcelAmount[0],
                        totalReturnedParcelAmount: totalReturnedParcelAmount[0],
                        totalCashAmount: totalCashAmount[0],
                        totalOnlineAmount: totalOnlineAmount[0],
                        totalCashDiposit: totalCashDiposit[0],
                        totalCashInHand: totalCashInHand[0]
                    },
                    status: 200,
                    message: "success",
                });
            } else {
                resolve({
                    data: [],
                    status: 200,
                    message: "No record found",
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: 'Something went wrong.',
            });
        }
    });
};


module.exports.MonthlyCashCount = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCashInHand = await CashInHand.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('totalCash')), 'total_cash_in_hand'],
                ],
                group: ['date'],
            });
            const totalCashDeposit = await cashModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('totalCash')), 'total_deposit_ammount'],
                ],
                group: ['date'],
            });
            if (totalCashInHand && totalCashDeposit) {
                const respone = {
                    totalCashDeposit: totalCashDeposit,
                    totalCashInHand: totalCashInHand
                }
                resolve({
                    status: 200,
                    data: respone,
                    message: "success",
                });
            } else {
                resolve({
                    data: [],
                    status: 404,
                    message: "Data not found.",
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


module.exports.dailyCount = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalParcelRecived = await ParcelModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('noOfParcel')), 'totalParcelRecived'],
                ],
                group: ['date'],
            });
            const totalDeliverdParcel = await parcelAllotModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('deliverdParcel')), 'totalDeliverdParcel'],
                ],
                group: ['date'],
            });
            const totalReturnedParcel = await parcelAllotModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('returnedParcel')), 'totalReturnedParcel'],
                ],
                group: ['date'],
            });
            const totalRejectParcel = await parcelAllotModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('rejectParcel')), 'totalRejectParcel'],
                ],
                group: ['date'],
            });
            const totalNextDayParcel = await parcelAllotModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('sum', Sequelize.col('nextDayParcel')), 'totalNextDayParcel'],
                ],
                group: ['date'],
            });
            const totalPresentUser = await attandanceModel.findAll({
                attributes: [
                    'date', [Sequelize.fn('count', Sequelize.col('id')), 'totalPresentUser'],
                ],
                group: ['date'],
            });
            if (totalParcelRecived) {
                const respone = {
                    totalParcelRecived: totalParcelRecived,
                    totalDeliverdParcel: totalDeliverdParcel,
                    totalReturnedParcel: totalReturnedParcel,
                    totalRejectParcel: totalRejectParcel,
                    totalNextDayParcel: totalNextDayParcel,
                    totalPresentUser: totalPresentUser
                }
                resolve({
                    status: 200,
                    data: respone,
                    message: "success",
                });
            } else {
                resolve({
                    data: [],
                    status: 404,
                    message: "Data not found.",
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