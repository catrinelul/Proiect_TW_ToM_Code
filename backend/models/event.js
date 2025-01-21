const {DataTypes} = require('sequelize');
const sequelize = require("../database.js");

const Event = sequelize.define('event', {
    idEvent: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    date: {
        type: DataTypes.DATE, 
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME, 
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME, 
        allowNull: false,
    },
    isOpened: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "groups",
            key: "idGroup"
        }
    }
})

module.exports = Event;