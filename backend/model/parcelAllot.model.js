const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const parcelAllot = connection.define("parcelAllot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    totalParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    deliverdParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    returnedParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    returnedAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    rejectParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rejectAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    nextDayParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    nextDayAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    date: {
        type: DataTypes.DATEONLY()
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalCashAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    },
    totalOnlineAmmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00,
    }
});

module.exports = parcelAllot;