import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Contact = db.define('t_contacts', {
   destinationId: {
      type: DataTypes.INTEGER
   },
   contactName: {
      type: DataTypes.STRING
   },
   phoneNumber: {
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

Contact.prototype.softDelete = function () {
   this.setDataValue('deletedAt', new Date());
   return this.save();
};

Contact.findAllDeleted = function () {
   return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

export default Contact;