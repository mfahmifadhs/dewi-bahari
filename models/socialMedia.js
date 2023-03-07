import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const SocialMedia = db.define('t_social_media', {
   destinationId: {
      type: DataTypes.INTEGER
   },
   socialMedia: {
      type: DataTypes.STRING
   },
   link: {
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

SocialMedia.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

SocialMedia.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default SocialMedia;