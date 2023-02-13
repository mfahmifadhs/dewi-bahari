import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Provinces from "../models/provinceModel.js";

const { DataTypes } = Sequelize;
 
const City = db.define('t_cities',{
    provinceId:{
        type: DataTypes.INTEGER
    },
    city:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});


City.belongsTo(Provinces, {foreignKey: 'provinceId', targetKey: 'id'})
 
export default City;