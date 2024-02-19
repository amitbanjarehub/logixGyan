const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const CashInHand = connection.define("CashInHand", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    branchId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    totalCash: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    bankDeposit: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    date: {
        type: DataTypes.DATEONLY()
    }
});
module.exports = CashInHand;