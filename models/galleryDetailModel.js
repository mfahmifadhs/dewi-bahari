import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Gallery from "../models/galleryModel.js";

const { DataTypes } = Sequelize;

const GalleryDetail = db.define('t_galleries_details', {
   galleryId: {
      type: DataTypes.INTEGER
   },
   category: {
      type: DataTypes.TEXT
   },
   filePict: {
      type: DataTypes.TEXT
   },
   url: {
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

GalleryDetail.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

GalleryDetail.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

GalleryDetail.belongsTo(Gallery, { foreignKey: 'galleryId', targetKey: 'id' })

export default GalleryDetail;