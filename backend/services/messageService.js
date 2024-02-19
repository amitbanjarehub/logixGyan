const messageModel = require("../model/message.model");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

module.exports.addMessage = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const messageData = {
                title: body.title,
                subject: body.subject,
                description: body.description,
            };
            if (body.userId) {
                messageData.userId = body.userId;
            }
            if (body.designation) {
                messageData.designation = body.designation;
            }
            if (body.branchId) {
                messageData.branchId = body.branchId;
            }
            const saveMessage = await messageModel.create(messageData);
            if (saveMessage) {
                resolve({
                    status: 200,
                    message: "Message Added successfully.",
                });
            } else {
                resolve({
                    status: 409,
                    message: "Error.",
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

module.exports.messageDetails = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMessage = await messageModel.findOne({
                where: { id: params.id },
            });
            if (checkMessage) {
                resolve({

                    status: 200,
                    data: checkMessage,
                    message: "success",
                });
            } else {
                resolve({
                    data: [],

                    status: 404,
                    message: "Message not exist.",
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

module.exports.deleteMessage = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkMessage = await messageModel.findOne({
                where: { id: params.id },
            });
            if (checkMessage) {
                await messageModel.destroy({ where: { id: params.id } });
                resolve({

                    status: 200,
                    data: [],
                    message: "Message delete successfully",
                });
            } else {
                resolve({
                    data: [],

                    status: 404,
                    message: "Message not exist.",
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

module.exports.allMessageList = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const sortby = order_type + order_by;
            const userId = params.userId ? params.userId : "";
            const designation = params.designation ? params.designation : "";
            const branchId = params.branchId ? params.branchId : "";
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            if (userId != "") {
                filterData.where.userId = userId;
            }
            if (designation != "") {
                filterData.where.designation = designation;
            }
            if (branchId != "") {
                filterData.where.branchId = branchId;
            }
            const DataCount = await messageModel.count(filterData);
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getMessage = await messageModel.findAll(filterData);
            if (getMessage.length > 0) {
                resolve({
                    count: DataCount,
                    status: 200,
                    data: getMessage,
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

module.exports.myMessageList = (user, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order_by = params.order_by ? params.order_by : "id";
            const order_type = params.order_type == "ASC" ? "" : "-";
            const sortby = order_type + order_by;
            const filterData = { where: {}, sort: [sortby] };
            const pageNumber = params.pageNumber;
            const DataCount = await messageModel.count(filterData);
            filterData.where = {
                [Op.or]: [{
                    userId: user.id
                },
                {
                    branchId: user.branchId
                },
                {
                    designation: user.role
                }
                ],
            };
            if (pageNumber) {
                filterData.limit = 10;
                filterData.offset = (pageNumber - 1) * filterData.limit
            }
            const getMessage = await messageModel.findAll(filterData);
            if (getMessage.length > 0) {
                resolve({
                    count: DataCount,
                    status: 200,
                    data: getMessage,
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