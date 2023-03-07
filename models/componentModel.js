import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Menus from "../models/menuModel.js";
import Users from "../models/userModel.js";

const { DataTypes } = Sequelize;

const Component = db.define('t_components', {
   category: {
      type: DataTypes.STRING
   },
   title: {
      type: DataTypes.STRING
   },
   description: {
      type: DataTypes.STRING
   },
   filePict: {
      type: DataTypes.STRING
   },
   url: {
      type: DataTypes.STRING
   },
   deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null
   }
}, {
   freezeTableName: true,
   defaultScope: {
      where: { deletedAt: null }
   }
});

Component.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Component.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default Component;