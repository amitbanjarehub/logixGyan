const userModel = require("../model/user.model");
const UserBankAccount = require("../model/user_bank_account.model");
const CompanyModel = require("../model/company.model");
const BranchModel = require("../model/branch.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");
const { phone } = require("phone");
const moment = require('moment');
require("dotenv").config();



const express = require('express');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());



module.exports.addUser = (body) => {

    return new Promise(async (resolve, reject) => {
        try {
            const checkPhone = phone(body.body.mobileNumber, { country: "IND" });
            if (checkPhone.isValid == false) {
                resolve({
                    status: 400,
                    message: "Please enter valid mobile number.",
                });
            } else {
                const userData = {
                    name: body.body.name,
                    email: body.body.email,
                    role: body.body.role,
                    address: body.body.address,
                    dob: body.body.dob,
                    mobileNumber: body.body.mobileNumber,
                    aadharNumber: body.body.aadharNumber,
                    panNumber: body.body.panNumber,
                    branchId: body.body.branchId,
                    bloodGroup: body.body.bloodGroup,
                    userImage: body.files[0].filename,
                    publicId: new Date().getTime(),

                };
                const checkUser = await userModel.findOne({
                    where: { email: body.body.email },
                });
                if (checkUser && checkUser.isBlock == 'yes') {
                    resolve({
                        status: 500,
                        message: "Your profile is block by admin please contact support team.",
                    });
                }
                if (checkUser == null || checkUser == "") {
                    const saveUser = await userModel.create(userData);
                    const bankData = {
                        userId: saveUser.id,
                        AccountNumber: body.body.AccountNumber,
                        BankName: body.body.BankName,
                        ifscCode: body.body.ifscCode,
                        upiId: body.body.upiId,
                        employementType: body.body.employementType,
                    };
                    const saveBankData = await UserBankAccount.create(bankData);
                    if (saveBankData) {
                        resolve({
                            status: 200,
                            message: "User registred successfully",
                        });
                    } else {
                        resolve({
                            status: 409,
                            message: "registred failed",
                        });
                    }
                } else {
                    resolve({
                        status: 409,
                        message: "User already registered",
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

//user verify by admin
module.exports.userVerifyByAdmin = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userUpdate;
            const userData = {
                id: body.userId,
                isApproved: "verify",
                role: body.role,
                salary: body.salary,
                branchId: body.branchId,
                companyId: body.companyId,
                travellingAllowance: body.travellingAllowance
            };
            const checkUser = await userModel.findOne({
                where: { id: body.userId },
            });
            if (checkUser) {
                if (body.isApproved == "yes") {
                    const randomPassword = Math.random().toString(36).slice(2, 10);
                    const hash = await bcrypt.hash(randomPassword, 10);
                    userData.password = hash;
                    userUpdate = await userModel.update(userData, {
                        where: { id: body.userId },
                    });
                    const bankData = {
                        employementType: body.employementType
                    }
                    await UserBankAccount.update(bankData, {
                        where: { id: body.userId },
                    });
                    var transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.MAIL_USERNAME,
                            pass: process.env.MAIL_PASSWORD,
                        },
                    });

                    var mailOptions = {
                        from: process.env.MAIL_USERNAME,
                        to: checkUser.email,
                        subject: "Your login credential",
                        text: "Your login credentials for your new role:- " + body.role + " at our company Email:- " + checkUser.email + " and Password :- " + randomPassword,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email sent: " + info.response);
                        }
                    });
                } else {
                    userUpdate = await userModel.destroy({
                        where: { id: body.userId },
                    });
                }
                if (userUpdate) {
                    resolve({
                        status: 200,
                        message: "User verification successfully done.",
                    });
                } else {
                    resolve({
                        status: 409,
                        message: "User verification failed.",
                    });
                }
            } else {
                resolve({
                    status: 409,
                    message: "User not registered",
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

module.exports.login = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = body;
            const checkUser = await userModel.findOne({
                where: { email: email },
            });
            if (checkUser && checkUser.isBlock == 'yes') {
                resolve({
                    status: 500,
                    message: "Your profile is block by admin please contact support team.",
                });
            }
            if (checkUser == null || checkUser == "") {
                resolve({
                    status: 409,
                    message: "User not found",
                });
            } else {
                const Match = await bcrypt.compare(password, checkUser.password);
                if (Match == true) {
                    const token = jwt.sign({
                        id: checkUser.id,
                        email: checkUser.email,
                        role: checkUser.role,
                        branchId: checkUser.branchId,
                        publicId: checkUser.publicId,
                        companyId: checkUser.companyId
                    },
                        "ss hh dd", { expiresIn: "12h" }
                    );
                    resolve({
                        status: 200,
                        data: checkUser,
                        token: token,
                        message: "Success",
                    });
                } else {
                    resolve({
                        status: 409,
                        message: "Password not match",
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







module.exports.allUserList = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const Data = [];
           
            const DataCount = await userModel.count();
          
            const getUser = await userModel.findAll();

            if (getUser.length > 0) {

                for (let userLIst of getUser) {                    
                 
                    const data = {

                        id: userLIst.id,
                        name: userLIst.name,
                        email: userLIst.email,
                        role: userLIst.role,
                        address: userLIst.address,
                        dob: userLIst.dob,
                        mobileNumber: userLIst.mobileNumber,
                        aadharNumber: userLIst.aadharNumber,
                        panNumber: userLIst.panNumber,                       
                        bloodGroup: userLIst.bloodGroup,
                        userImage: userLIst.userImage,
                        salary: userLIst.salary,
                        travellingAllowance: userLIst.travellingAllowance,
                        companyId: userLIst.companyId,                      
                       
                       
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
                    status: 409,
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

module.exports.userDetails = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                where: { id: params.userId },
                attributes: ['id', 'publicId', 'role', 'name', 'email', 'address', 'dob', 'mobileNumber', 'aadharNumber', 'panNumber', 'branchId', 'bloodGroup', 'userImage', 'salary', 'travellingAllowance', 'companyId', 'isApproved']
            });
            if (checkUser) {
                const BankDetails = await UserBankAccount.findOne({
                    where: { userId: params.userId },
                });
                const companyName = await CompanyModel.findOne({
                    where: { id: checkUser.companyId },
                    attributes: ['companyName']
                });
                const branchName = await BranchModel.findOne({
                    where: { id: checkUser.branchId },
                    attributes: ['branchName']
                });

                resolve({
                    status: 200,
                    data: { ...checkUser.dataValues, bankDetails: BankDetails, companyName: companyName, branchName: branchName },
                    message: "success",
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

module.exports.deleteUser = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                where: { id: params.userId },
            });
            if (checkUser) {
                await userModel.destroy({ where: { id: params.userId } });
                await UserBankAccount.destroy({ where: { userId: params.userId } });
                resolve({
                    status: 200,
                    data: [],
                    message: "User delete successfully",
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

module.exports.verifyUsersList = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Data = [];
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const sortby = order_type + order_by;
            const branchId = params.branchId ? params.branchId : "";
            const name = params.name ? params.name : "";
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            if (branchId != "") {
                filterData.where.branchId = branchId;
            }
            if (name != "") {
                filterData.where.name = name;
            }
            // filterData.where.isBlock = 'no';
            filterData.where.isApproved = "verify";
            const DataCount = await userModel.count(filterData);
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getUser = await userModel.findAll(filterData);
            if (getUser.length > 0) {
                for (let userLIst of getUser) {
                    const getBranch = await BranchModel.findOne({
                        where: { id: userLIst.branchId },
                    });
                    const getCompany = await CompanyModel.findOne({
                        where: { id: userLIst.companyId },
                    });
                    const data = {
                        id: userLIst.id,
                        name: userLIst.name,
                        email: userLIst.email,
                        role: userLIst.role,
                        address: userLIst.address,
                        dob: userLIst.dob,
                        mobileNumber: userLIst.mobileNumber,
                        aadharNumber: userLIst.aadharNumber,
                        panNumber: userLIst.panNumber,
                        branchId: userLIst.branchId,
                        bloodGroup: userLIst.bloodGroup,
                        userImage: userLIst.userImage,
                        salary: userLIst.salary,
                        travellingAllowance: userLIst.travellingAllowance,
                        isBlock: userLIst.isBlock,
                        companyId: userLIst.companyId,
                        publicId: userLIst.publicId,
                        branchData: getBranch,
                        companyData: getCompany
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

module.exports.updateUser = (req) => {
    return new Promise(async (resolve, reject) => {

        try {
            console.log("updateUser_bloodGroup:----------->>>", req)
            // console.log("files", req.files.userImage);
            // console.log("body.files[0].filename========>>>>>>>>>>>>>>>>", body.files[0].userImage)
            const data = req.files;
            const userData = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                address: req.body.address,
                dob: req.body.dob,
                mobileNumber: req.body.mobileNumber,
                aadharNumber: req.body.aadharNumber,
                panNumber: req.body.panNumber,
                isApproved: req.body.isApproved,
                branchId: req.body.branchId,
                bloodGroup: req.body.bloodGroup,
                travellingAllowance: req.body.travellingAllowance,
                role: req.body.role,

            };
            data.forEach((element) => {
                if (element.fieldname == "userImage") {
                    userData.userImage = element.filename;
                }

            });
            const checkUser = await userModel.findOne({
                where: { id: req.params.userId },
            });
            if (checkUser) {
                if (req.body.password) {
                    const hash = await bcrypt.hash(req.body.password, 10);
                    userData.password = hash;
                }
                await userModel.update(userData, {
                    where: { id: req.params.userId },
                });
                const bankData = {
                    AccountNumber: req.body.AccountNumber,
                    BankName: req.body.BankName,
                    ifscCode: req.body.ifscCode,
                    upiId: req.body.upiId,
                    employementType: req.body.employementType,
                };
                const saveBankData = await UserBankAccount.update(bankData, {
                    where: { userId: req.params.userId },
                });
                if (saveBankData) {
                    resolve({
                        status: 200,
                        message: "Profile update successfully",
                    });
                } else {
                    resolve({
                        status: 409,
                        message: "Failed to update user profile.",
                    });
                }
            } else {
                resolve({
                    status: 409,
                    message: "User not found.",
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

module.exports.userImage = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const today = moment();
            const imageData = {
                image: body.filename,
                userId: user.id,
                date: today.format("YYYY-MM-DD"),
            };
            console.log(imageData);
            const abc = await userImageModel.create(imageData);
            if (abc) {
                resolve({
                    status: 200,
                    message: "image Success",
                });
            } else {
                resolve({
                    status: 409,
                    message: "Failed to upload image",
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


module.exports.userByToken = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUser = await userModel.findOne({
                where: { id: user.id },
                attributes: ['id', 'publicId', 'role', 'name', 'email', 'address', 'dob', 'mobileNumber', 'aadharNumber', 'panNumber', 'branchId', 'bloodGroup', 'userImage', 'salary', 'companyId', 'isApproved']
            });
            if (getUser) {
                const BankDetails = await UserBankAccount.findOne({
                    where: { userId: user.id },
                });
                const companyName = await CompanyModel.findOne({
                    where: { id: getUser.companyId },
                    attributes: ['companyName']
                });
                const branchName = await BranchModel.findOne({
                    where: { id: getUser.branchId },
                    attributes: ['branchName']
                });
                resolve({
                    data: { ...getUser.dataValues, bankDetails: BankDetails, companyName: companyName, branchName: branchName },
                    status: 200,
                    message: 'success'
                })
            } else {
                resolve({
                    data: "",
                    status: 409,
                    message: 'error'
                })
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: 500,
                message: "Something went wrong.",
            });
        }
    })
};

//user verify by super visor
module.exports.userVerifyBySuperVisor = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {
                isApproved: "bacic-verify"
            };
            const checkUser = await userModel.findOne({
                where: { id: body.userId },
            });
            if (checkUser) {
                const updateData = await userModel.update(userData, {
                    where: { id: body.userId },
                });
                if (updateData) {
                    resolve({
                        status: 200,
                        message: "User verify successfully",
                    });
                } else {
                    resolve({
                        status: 409,
                        message: "User verify successfully.",
                    });
                }
            } else {
                resolve({
                    status: 409,
                    message: "User not found.",
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

//block or unblock a user
module.exports.statusUpdate = (body, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                where: { id: params.userId },
            });
            const ReqData = {
                isBlock: body.isBlock
            }
            if (checkUser) {
                const blockUser = await userModel.update(ReqData, {
                    where: { id: checkUser.id },
                });
                if (blockUser) {
                    resolve({
                        status: 200,
                        message: "User status update successfully",
                    });
                } else {
                    resolve({
                        status: 400,
                        message: "Failed to update user status.",
                    });
                }
            } else {
                resolve({
                    status: 409,
                    message: "User not found.",
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