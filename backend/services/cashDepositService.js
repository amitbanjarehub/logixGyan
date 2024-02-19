const CashModel = require("../model/cash.model");
const { Sequelize } = require("sequelize");
const op = Sequelize.Op;


module.exports.addCash = (body, user) => {
    console.log("body:----->>>", body.body.branchId)


    return new Promise(async (resolve, reject) => {

        try {
            const data = body.files;
            const cashData = {
                branchId: body.body.branchId,
                bankDeposit: body.body.bankDeposit,
                date: Date.now(),

            };
            data.forEach((element) => {
                if (element.fieldname == "cmsboyImage") {
                    cashData.cmsboyImage = element.filename;
                }
                if (element.fieldname == "depositeSlipImage") {
                    cashData.depositeSlipImage = element.filename;
                }
                if (element.fieldname == "supportDocImage") {
                    cashData.supportDocImage = element.filename;
                }
            });
            console.log("cashData:------->>>", cashData)
            const addExpences = await CashModel.create(cashData);
            if (addExpences) {
                resolve({
                    status: 200,
                    message: "Cash Deposit successfully",
                });
            } else {
                resolve({
                    status: 400,
                    message: "Something went wrong",
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



module.exports.cashList = (params, user) => {

    return new Promise(async (resolve, reject) => {
        try {
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const branchId = params.branchId ? params.branchId : "";
            const id = params.id ? params.id : "";
            const date = params.date ? params.date : "";
            const startDate = params.startDate ? params.startDate : "";
            const endDate = params.endDate ? params.endDate : "";
            const cash = params.cash ? params.cash : "";
            const sortby = order_type + order_by;
            const filterData = { where: {}, sort: [sortby] };
            const totalFilterData = { where: {}, sort: [sortby] };

            const pageNumber = params.pageNumber;


            if (branchId != "") {
                filterData.where.branchId = branchId;

            }

            if (id != "") {
                filterData.where.id = id;
            }

            const DataCount = await CashModel.count(filterData);

            if (date != "") {
                filterData.where.date = date;

            }
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
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

                totalFilterData.where.branchId = branchId;



            }
            const getCash = await CashModel.findAll(filterData);

            let sumCash = 0;
            let sumBank = 0;

            const totalCash = await CashModel.findAll(totalFilterData);

            for (let i = 0; i < totalCash.length; i++) {
                sumCash = sumCash + totalCash[i].dataValues.cash

            }

            const totalDeposit = await CashModel.findAll(totalFilterData);
            for (let i = 0; i < totalDeposit.length; i++) {
                sumBank = sumBank + totalDeposit[i].dataValues.bankDeposit

            }
            const cashInHand = sumCash - sumBank;

            if (getCash.length > 0) {
                resolve({
                    count: DataCount,
                    status: 200,
                    totalCash: sumCash,
                    totalDeposit: sumBank,
                    cashInHand: cashInHand,
                    data: getCash,
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

//update cash
module.exports.updateCash = (body) => {
    console.log("body--------->>>", body)
    return new Promise(async (resolve, reject) => {
        try {
            const cashData = await CashModel.findOne({
                where: { id: body.params.id }
            });

            const data = body.files;
            const reqData = {

                bankDeposit: body.body.bankDeposit,

            }
            data.forEach((element) => {
                if (element.fieldname == "cmsboyImage") {
                    reqData.cmsboyImage = element.filename;
                }
                if (element.fieldname == "depositeSlipImage") {
                    reqData.depositeSlipImage = element.filename;
                }
                if (element.fieldname == "supportDocImage") {
                    reqData.supportDocImage = element.filename;
                }
            });

            if (cashData) {
                await CashModel.update(reqData, {
                    where: { id: cashData.id }
                });
                resolve({
                    status: 200,
                    message: "Cash data update successfully",
                });
            } else {
                resolve({
                    status: 404,
                    message: "Cash details not found",
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