import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
 
const Users = db.define('t_users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    roleId:{
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    phoneNum:{
        type: DataTypes.BIGINT
    },
    address:{
        type: DataTypes.TEXT
    },
    password:{
        type: DataTypes.TEXT
    },
    refreshToken:{
        type: DataTypes.TEXT
    },
    isDelete:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Users;