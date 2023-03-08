import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Destination from "./destinationModel.js";

const { DataTypes } = Sequelize;

const Province = db.define('t_provinces', {
    province: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Province;