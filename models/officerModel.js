import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Officer = db.define('t_officers', {
   destinationId: {
      type: DataTypes.INTEGER
   },
   nameOfficer: {
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

Officer.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Officer.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default Officer;