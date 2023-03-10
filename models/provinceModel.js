import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Destination from "./destinationModel.js";

const { DataTypes } = Sequelize;

const Province = db.define('t_provinces', {
    province: {
        type: DataTypes.STRING
    },
    position:{
        type: DataTypes.JSON
    },
},{
    freezeTableName: true
});

export default Province;