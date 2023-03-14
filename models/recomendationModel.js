import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Destination from "./destinationModel.js";

const { DataTypes } = Sequelize;

const Recomendation = db.define('t_recomendations', {
   destinationId: {
      type: DataTypes.INTEGER
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

Recomendation.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Recomendation.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

Recomendation.belongsTo(Destination, { foreignKey: 'destinationId', targetKey: 'id' })

export default Recomendation;