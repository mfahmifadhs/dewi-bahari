import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "../models/userModel.js";
import Destination from "../models/destinationModel.js";

const { DataTypes } = Sequelize;

const Gallery = db.define('t_galleries', {
   userId: {
      type: DataTypes.INTEGER
   },
   destinationId: {
      type: DataTypes.INTEGER
   },
   title: {
      type: DataTypes.STRING
   },
   tag: {
      type: DataTypes.TEXT
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

Gallery.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Gallery.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

Gallery.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' })
Gallery.belongsTo(Destination, { foreignKey: 'destinationId', targetKey: 'id' })

export default Gallery;