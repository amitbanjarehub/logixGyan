const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const Branch = connection.define("Branch", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    branchName: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: null,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    lat: {
        type: DataTypes.FLOAT(10, 6),
        allowNull: null,
    },
    long: {
        type: DataTypes.FLOAT(10, 6),
        allowNull: null,
    },
});

module.exports = Branch;