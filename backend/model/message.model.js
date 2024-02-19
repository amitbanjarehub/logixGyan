const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const messageCenter = connection.define("messageCenter", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    designation: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    subject: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    branchId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
});

module.exports = messageCenter;