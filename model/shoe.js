const { DataTypes } = require('sequelize');
const db = require('../db');

const Shoe = db.define('shoe', {
    shoeName: {
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
    samePair:{
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

module.exports = Shoe;