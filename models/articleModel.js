import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Destinations from "../models/destinationModel.js";
import Users from "../models/userModel.js";

const { DataTypes } = Sequelize;

const Article = db.define('t_articles', {
   userId: {
      type: DataTypes.INTEGER
   },
   destinationId: {
      type: DataTypes.INTEGER
   },
   title: {
      type: DataTypes.STRING
   },
   content: {
      type: DataTypes.TEXT
   },
   filePict: {
      type: DataTypes.TEXT
   },
   url: {
      type: DataTypes.TEXT
   },
   isApprove: {
      type: DataTypes.STRING
   },
   isDelete: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
   }
}, {
   freezeTableName: true
});


Article.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' })
Article.belongsTo(Destinations, { foreignKey: 'destinationId', targetKey: 'id' })

export default Article;