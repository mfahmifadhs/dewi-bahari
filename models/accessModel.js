import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Menus from "../models/menuModel.js";
import Users from "../models/userModel.js";

const { DataTypes } = Sequelize;

const Access = db.define('t_access', {
   menuId: {
      type: DataTypes.INTEGER
   },
   userId: {
      type: DataTypes.INTEGER
   },
   isCreate: {
      type: DataTypes.INTEGER
   },
   isRead: {
      type: DataTypes.INTEGER
   },
   isUpdate: {
      type: DataTypes.INTEGER
   },
   isDelete: {
      type: DataTypes.INTEGER
   }
}, {
   freezeTableName: true
});


Access.belongsTo(Menus, {foreignKey: 'menuId', targetKey: 'id'})
Access.belongsTo(Users, {foreignKey: 'userId', targetKey: 'id'})

export default Access;