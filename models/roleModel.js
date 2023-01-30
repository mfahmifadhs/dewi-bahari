import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Roles = db.define('t_roles', {
   role: {
      type: DataTypes.INTEGER
   }
}, {
   freezeTableName: true
});

export default Roles;