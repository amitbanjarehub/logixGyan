const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const Cash = connection.define("cash", {
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
    cash: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    bankDeposit: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },

    cmsboyImage: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    depositeSlipImage: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    supportDocImage: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    date: {
        type: DataTypes.DATEONLY()
    }
});
module.exports = Cash;