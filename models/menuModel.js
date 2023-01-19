import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
 
const Menu = db.define('t_menus',{
    menu:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    isDelete:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Menu;