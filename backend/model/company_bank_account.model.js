const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const CompanyBankAccount = connection.define("company_bank_account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    accountNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    bankName: {
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
    }
});

module.exports = CompanyBankAccount;