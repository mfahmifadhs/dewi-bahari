import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Destination = db.define('t_destinations', {
   kdProv: {
      type: DataTypes.INTEGER
   },
   kdKab: {
      type: DataTypes.INTEGER
   },
   category: {
      type: DataTypes.INTEGER
   },
   destination: {
      type: DataTypes.TEXT
   },
   address: {
      type: DataTypes.TEXT
   },
   description: {
      type: DataTypes.TEXT
   },
   embMap: {
      type: DataTypes.TEXT
   },
   userId: {
      type: DataTypes.INTEGER
   },
   isDelete: {
      type: DataTypes.STRING
   }
}, {
   freezeTableName: true
});

Destination.belongsTo(Users, {foreignKey: 'userId', targetKey: 'id'})

export default Destination;