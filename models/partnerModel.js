import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Partner = db.define('t_partners', {
   category: {
      type: DataTypes.STRING
   },
   partner: {
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

Partner.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Partner.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default Partner;