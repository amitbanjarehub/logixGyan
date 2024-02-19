const companyModel = require("../model/company.model");
const companyBankModel = require("../model/company_bank_account.model");
const branchModel = require("../model/branch.model");
const { Sequelize } = require("sequelize");
const op = Sequelize.Op;

module.exports.addCompany = (body) => {
    return new Promise(async(resolve, reject) => {
        try {
            const companyData = {
                companyName: body.companyName,
                address: body.address,
                gstNo: body.gstNo
            };
            const checkCompany = await companyModel.findOne({
                where: { gstNo: body.gstNo },
            });
            if (checkCompany == null || checkCompany == "") {
                const saveCompany = await companyModel.create(companyData);
                const bankData = {
                    companyId: saveCompany.id,
                    accountNumber: body.accountNumber,
                    bankName: body.bankName,
                    ifscCode: body.ifscCode,
                    upiId: body.upiId,
                };
                const saveBankData = await companyBankModel.create(bankData);
                if (saveBankData) {
                    resolve({
                        status: 200,
                        message: "Company registred successfully",
                    });
                } else {
                    resolve({
                        status: 409,
                        message: "Company registred failed",
                    });
                }
            } else {
                resolve({
                    status: 409,
                    message: "Company already registered",
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

module.exports.companyList = (user, params) => {
    return new Promise(async(resolve, reject) => {
        try {
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const sortby = order_type + order_by;
            const companyName = params.companyName ? params.companyName : "";
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            if (companyName != "") {
                filterData.where.companyName = companyName;
            }
            const DataCount = await companyModel.count(filterData)
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getCompany = await companyModel.findAll(filterData);
            if (getCompany.length > 0) {
                resolve({
                    count: DataCount,
                    status: 200,
                    data: getCompany,
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

module.exports.companyDetails = (params) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkCompany = await companyModel.findOne({
                where: { id: params.id },
            });
            if (checkCompany) {
                const BankDetails = await companyBankModel.findOne({
                    where: { companyId: params.id },
                });
                const companyBranch = await branchModel.findAll({
                    where: { companyId: params.id }
                });
                resolve({
                    status: 200,
                    data: {...checkCompany.dataValues, bankDetails: BankDetails, companyBranch: companyBranch },
                    message: "success",
                });
            } else {
                resolve({
                    data: [],
                    status: 404,
                    message: "Company not exist.",
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

module.exports.updateCompany = (body, params) => {
    return new Promise(async(resolve, reject) => {
        try {
            const companyData = await companyModel.findOne({
                where: { id: params.id }
            });
            if (companyData) {
                await companyModel.update({
                    companyName: body.companyName,
                    address: body.address,
                    gstNo: body.gstNo
                }, {
                    where: { id: params.id }
                });
                if (body.accountNumber || body.bankName || body.ifscCode || body.upiId) {
                    await companyBankModel.update({
                        accountNumber: body.accountNumber,
                        bankName: body.bankName,
                        ifscCode: body.ifscCode,
                        upiId: body.upiId,
                    }, { where: { companyId: params.id } }, )
                }
                resolve({
                    status: 200,
                    message: "Company info update successfully",
                });
            } else {
                resolve({
                    status: 404,
                    message: "Company info not found",
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