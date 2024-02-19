const parcelModel = require("../model/parcel.model");
const parcelAllotModel = require("../model/parcelAllot.model");
const userModel = require("../model/user.model");
const userBankModel = require("../model/user_bank_account.model");
const CashInHand = require("../model/cashInHand.model");
const CashModel = require("../model/cash.model");
const { Sequelize, DATE } = require("sequelize");
const UserBankAccount = require("../model/user_bank_account.model");
const op = Sequelize.Op;

//all parecl add
module.exports.addParcel = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parcelData = {
                noOfParcel: body.noOfParcel,
                ammount: body.ammount,
                date: Date.now(),
                publicId: new Date().getTime(),
                branchId: user.branchId,
                remark: body.remark
            };
            const saveParcel = await parcelModel.create(parcelData);
            if (saveParcel) {
                resolve({
                    status: 200,
                    message: "Parcel added successfully",
                });
            } else {
                resolve({
                    status: 400,
                    message: "Parcel not added",
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

//update parcel
module.exports.updateParcel = (body, params) => {
    // console.log("params_Values:",params);
    // console.log("body_Values:",body);
    return new Promise(async (resolve, reject) => {
        try {
            const parcelData = await parcelModel.findOne({
                where: { id: params.id }
            });
            if (parcelData) {

                const ReqData = {
                    noOfParcel: body.noOfParcel,
                    ammount: body.ammount,
                    remark: body.remark,

                }
                console.log("ReqData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", ReqData);
                const updateData = await parcelModel.update(ReqData, {
                    where: { id: params.id },
                });
                console.log("updateData-----------------------------", updateData)


                resolve({
                    status: 200,
                    message: "Parcel info update successfully",
                });
            } else {
                resolve({
                    status: 404,
                    message: "Parcel info not found",
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
//get all parcel of a date
module.exports.dateByParcel = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = params.id ? params.id : "";
            const date = params.date ? params.date : "";
            const branchId = params.branchId ? params.branchId : "";
            const startDate = params.startDate ? params.startDate : "";
            const endDate = params.endDate ? params.endDate : "";
            const filterData = { where: {} };
            if (id != "") {
                filterData.where.id = id;
            }
            if (date != "") {
                filterData.where.date = date;
            }
            if (branchId != "") {
                filterData.where.branchId = branchId;
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

            const parcelData = await parcelModel.findAll(filterData);


            if (parcelData) {
                resolve({
                    data: parcelData,
                    status: 200,
                    message: "success",
                });
            } else {
                resolve({
                    data: {},
                    status: 404,
                    message: "Parcel not found",
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


//all parcel list
module.exports.parcelList = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const branchId = params.branchId ? params.branchId : "";
            const startDate = params.startDate ? params.startDate : "";
            const endDate = params.endDate ? params.endDate : "";
            const date = params.date ? params.date : "";
            const sortby = order_type + order_by;
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            if (branchId != "") {
                filterData.where.branchId = branchId;
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
            const DataCount = await parcelModel.count(filterData);
            if (date != "") {
                filterData.where.date = date;
            }
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getParcel = await parcelModel.findAll(filterData);
            if (getParcel.length > 0) {
                resolve({
                    count: DataCount,
                    status: 200,
                    data: getParcel,
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
                message: 'Something went wrong.',
            });
        }
    });
};

//parcel allot delivery boy
module.exports.parcelAllot = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parcelData = {
                userId: body.userId,
                totalParcel: body.totalParcel,
                totalAmmount: body.totalAmmount,
                date: Date.now(),
                publicId: new Date().getTime(),
                branchId: user.branchId
            };
            const saveParcel = await parcelAllotModel.create(parcelData);
            if (saveParcel) {
                resolve({
                    status: 200,
                    message: "Parcel allot successfully",
                });
            } else {
                resolve({
                    status: 400,
                    message: "Parcel not alloted",
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

//get parcel by user id and a specify date
module.exports.deliveryBoyParcel = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parcelData = await parcelAllotModel.findAll({
                where: { date: params.date, userId: params.userId }
            });
            if (parcelData) {
                resolve({
                    data: parcelData,
                    status: 200,
                    message: "success",
                });
            } else {
                resolve({
                    data: {},
                    status: 404,
                    message: "Parcel not found",
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

//all parcel allot list
module.exports.parcelAllotList = (params, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Data = [];
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const branchId = params.branchId ? params.branchId : "";
            const startDate = params.startDate ? params.startDate : "";
            const endDate = params.endDate ? params.endDate : "";
            const date = params.date ? params.date : "";
            const userId = params.userId ? params.userId : "";
            const sortby = order_type + order_by;
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
            const DataCount = await parcelAllotModel.count(filterData);
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getParcel = await parcelAllotModel.findAll(filterData);
            if (getParcel.length > 0) {
                for (let userLIst of getParcel) {
                    const getUser = await userModel.findOne({
                        where: { id: userLIst.userId },
                    });

                    const BankDetails = await UserBankAccount.findOne({
                        where: { userId: userLIst.userId },
                    });

                    const getType = await userBankModel.findOne({
                        where: { userId: userLIst.userId },
                    });
                    // console.log("getType.name", getType)
                    // console.log("getUser>>>>>", getUser)
                    // con sole.log("getUser.name---->>>", getUser.name)
                    const data = {
                        id: userLIst.id,
                        noOfparcelAlloted: userLIst.totalParcel,
                        totalAmountofParcelAlloted: userLIst.totalAmmount,
                        deliverdParcel: userLIst.deliverdParcel,
                        returnedParcel: userLIst.returnedParcel,
                        returnedAmmount: userLIst.returnedAmmount,
                        rejectParcel: userLIst.rejectParcel,
                        rejectAmmount: userLIst.rejectAmmount,
                        nextDayParcel: userLIst.nextDayParcel,
                        nextDayAmmount: userLIst.nextDayAmmount,
                        totalCashAmmount: userLIst.totalCashAmmount,
                        totalOnlineAmmount: userLIst.totalOnlineAmmount,
                        date: userLIst.date,
                        publicId: userLIst.publicId,
                        branchId: userLIst.branchId,
                        userId: userLIst.userId,
                        userName: getUser.name,
                        userMobile: getUser.mobileNumber,
                        userBankAccountNumber: BankDetails,
                        userPanNumber: getUser.panNumber,
                        userSalary: getUser.salary,
                        userEmployementType: getType.employementType,
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
                message: 'Something went wrong.',
            });
        }
    });
};

//details of alloted parcel
module.exports.detailsAllotedPrcel = (params, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPrcel = await parcelAllotModel.findOne({
                where: { id: params.id },
            });
            if (checkPrcel) {
                resolve({
                    status: 200,
                    data: checkPrcel,
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

//update alloted parcel
module.exports.updateAllotedParcel = (body, params, user) => {
    console.log("params_Values:", params);
    console.log("body_Values:", body);
    console.log("User_Values:", user);
    return new Promise(async (resolve, reject) => {
        try {
            const parcelData = await parcelAllotModel.findOne({
                where: { id: params.id }
            });
            if (parcelData) {
                const ReqData = {
                    totalParcel: body.totalParcel,
                    totalAmmount: body.totalAmmount,
                    deliverdParcel: body.deliverdParcel,
                    returnedParcel: body.returnedParcel,
                    returnedAmmount: body.returnedAmmount,
                    rejectParcel: body.rejectParcel,
                    rejectAmmount: body.rejectAmmount,
                    nextDayParcel: body.nextDayParcel,
                    nextDayAmmount: body.nextDayAmmount,
                    totalCashAmmount: body.totalCashAmmount,
                    totalOnlineAmmount: body.totalOnlineAmmount
                }
                console.log("ReqData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", ReqData)
                const updateData = await parcelAllotModel.update(ReqData, {
                    where: { id: params.id },
                });
                console.log("updateData-----------------------------", updateData)
                if (updateData) {
                    const cashData = {
                        branchId: user.branchId,
                        // userId: user.id,
                        cash: body.totalCashAmmount,
                        date: Date.now()
                    };
                    const checkCash = await CashInHand.findOne({
                        where: { date: Date.now(), branchId: user.branchId },
                    });
                    if (checkCash) {
                        const NewCash = parseFloat(checkCash.cash) + parseFloat(body.totalCashAmmount);
                        const data = {
                            cash: NewCash,
                        }
                        await CashInHand.update(data, {
                            where: { id: checkCash.id }
                        });
                    } else {
                        const saveCash = await CashModel.create(cashData);
                        if (saveCash) {
                            resolve({
                                status: 200,
                                message: "Parcel update successfully",
                            });
                        } else {
                            resolve({
                                status: 400,
                                message: 'Unable to add cash.',
                            });
                        }
                    }
                }
                resolve({
                    status: 200,
                    message: "Parcel update successfully",
                });
            } else {
                resolve({
                    status: 404,
                    message: "Parcel info not found",
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