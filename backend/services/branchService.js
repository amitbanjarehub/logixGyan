const branchModel = require("../model/branch.model");
const UserBankAccount = require("../model/user_bank_account.model");
const userModel = require("../model/user.model");
const expencesModel = require("../model/expences.model");
const { Sequelize } = require("sequelize");
const op = Sequelize.Op;

module.exports.addBranch = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const branchData = {
        branchName: body.branchName,
        companyId: body.companyId,
        address: body.address,
        lat: body.lat,
        long: body.long,
      };
      const checkBranch = await branchModel.findOne({
        where: { lat: body.lat, long: body.long },
      });
      if (checkBranch == null || checkBranch == "") {
        const saveBranch = await branchModel.create(branchData);
        resolve({
          status: 200,
          message: "Branch added successfully",
        });
      } else {
        resolve({
          status: 409,
          message: "This branch already registerd",
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

module.exports.branchList = (user, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order_by = params.order_by ? params.order_by : "id";
      const order_type = params.order_type == "ASC" ? "" : "-";
      const sortby = order_type + order_by;
      const branchName = params.branchName ? params.branchName : "";
      const filterData = { where: {}, sort: [sortby] };
      const pageNumber = params.pageNumber;
      if (branchName != "") {
        filterData.where.branchName = branchName;
      }
      const DataCount = await branchModel.count(filterData);
      if (pageNumber) {
        filterData.limit = 10;
        filterData.offset = (pageNumber - 1) * filterData.limit;
      }
      const getBranch = await branchModel.findAll(filterData);
      if (getBranch.length > 0) {
        resolve({
          count: DataCount,
          status: 200,
          data: getBranch,
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

module.exports.branchDetails = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBranch = await branchModel.findOne({
        where: { id: params.id },
      });
      if (checkBranch) {
        resolve({
          status: 200,
          data: checkBranch,
          message: "success",
        });
      } else {
        resolve({
          data: [],
          status: 404,
          message: "Branch details not found.",
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

module.exports.updateBranch = (body, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const branchData = await branchModel.findOne({
        where: { id: params.id },
      });
      const reqData = {
        branchName: body.branchName,
        companyId: body.companyId,
        address: body.address,
        lat: body.lat,
        long: body.long,
      };
      if (branchData) {
        await branchModel.update(reqData, { where: { id: branchData.id } });
        resolve({
          status: 200,
          message: "Branch info update successfully",
        });
      } else {
        resolve({
          status: 404,
          message: "Branch info not found",
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

module.exports.addBranchExpences = (body) => {
  console.log("body_expense:------>>>", body.body)
  return new Promise(async (resolve, reject) => {
    try {
      const branchData = {
        branchId: body.body.branchId,
        userId: body.body.userId,
        particular: body.body.particular,
        remark: body.body.remark,
        description: body.body.description,
        ammount: body.body.ammount,
        date: Date.now(),
        supportingDocument: body.files[0].filename,

      };
      const addExpences = await expencesModel.create(branchData);
      if (addExpences) {
        resolve({
          status: 200,
          message: "Expences added successfully",
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

module.exports.getExpencesList = (user, params) => {
  console.log("Params Expense", params);
  return new Promise(async (resolve, reject) => {
    try {
      const Data = [];
      const order_by = params.order_by ? params.order_by : "id";
      const order_type = params.order_type == "ASC" ? "" : "-";
      const sortby = order_type + order_by;
      const branchId = params.branchId ? params.branchId : "";
      const id = params.id ? params.id : "";
      const startDate = params.startDate ? params.startDate : "";
      const endDate = params.endDate ? params.endDate : "";
      const date = params.date ? params.date : "";
      const filterData = { where: {}, sort: [sortby] };
      const pageNumber = params.pageNumber;
      if (branchId != "") {
        filterData.where.branchId = branchId;
      }
      if (id != "") {

        filterData.where.id = id;
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
      const DataCount = await expencesModel.count(filterData);

      if (date != "") {
        filterData.where.date = date;
      }
      if (pageNumber) {
        filterData.limit = 10;
        filterData.offset = (pageNumber - 1) * filterData.limit;
      }
      const getExpences = await expencesModel.findAll(filterData);
      if (getExpences.length > 0) {
        for (let userLIst of getExpences) {
          const getUser = await userModel.findOne({
            where: { id: userLIst.userId },
          });
          const BankDetails = await UserBankAccount.findOne({
            where: { userId: userLIst.userId },
          });
          const data = {
            id: userLIst.id,
            branchId: userLIst.branchId,
            userId: userLIst.userId,
            userName: getUser.name,
            userPanNumber: getUser.panNumber,
            userAccountNumber: getUser.accountNumber,
            userIfscCode: getUser.ifscCode,
            BankDetails: BankDetails,
            particular: userLIst.particular,
            remark: userLIst.remark,
            description: userLIst.description,
            ammount: userLIst.ammount,
            date: userLIst.date,
            supportingDocument: userLIst.supportingDocument,



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


module.exports.updateExpenses = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const expensesData = await expencesModel.findOne({
        where: { id: body.params.id },
      });
      console.log("body.files[0].filename>>>>>>>>>>>>>>>>", body.files[0].filename)
      const reqData = {
        particular: body.body.particular,
        remark: body.body.remark,
        description: body.body.description,
        ammount: body.body.ammount,
        date: Date.now(),
        supportingDocument: body.files[0].filename
      };
      if (expensesData) {
        await expencesModel.update(reqData, { where: { id: expensesData.id } });
        resolve({
          status: 200,
          message: "Expenses info update successfully",
        });
      } else {
        resolve({
          status: 404,
          message: "Expenses info not found",
        });
      }
    }
    catch (err) {
      console.log(err);
      resolve({
        status: 500,
        message: "Something went wrong.",
      });
    }
  });
};

module.exports.deleteExpences = (params) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkUser = await expencesModel.findOne({
              where: { id: params.id },
          });
          if (checkUser) {
              await expencesModel.destroy({ where: { id: params.id } });
             
              resolve({
                  status: 200,
                  data: [],
                  message: "Expences delete successfully",
              });
          } else {
              resolve({
                  data: [],
                  status: 404,
                  message: "User not exist.",
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

