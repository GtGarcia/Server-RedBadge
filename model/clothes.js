const { DataTypes } = require('sequelize');
const db = require('../db');

const Clothes = db.define('clothes', {
    clothesName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:false
    },
    sameClothes:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: false,
    },
    buyPrice: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    sellPrice: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
});

module.exports = Clothes;