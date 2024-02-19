const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const Company = connection.define("Company", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    gstNo: {
        type: DataTypes.STRING,
        allowNull: null,
    },
});

module.exports = Company;