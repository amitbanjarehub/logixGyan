const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const Parcel = connection.define("Parcel", {
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
    noOfParcel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    ammount: {
        type: DataTypes.DOUBLE,
        allowNull: 0.00,
    },
    date: {
        type: DataTypes.DATEONLY()
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Parcel;