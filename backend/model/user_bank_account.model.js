const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const UserBankAccount = connection.define("user_bank_account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    AccountNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    BankName: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    ifscCode: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    upiId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    employementType: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

module.exports = UserBankAccount;