import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Facility = db.define('t_facilities', {
   destinationId: {
      type: DataTypes.INTEGER
   },
   nameFacility: {
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

Facility.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Facility.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default Facility;