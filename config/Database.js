import {Sequelize} from "sequelize";

const db = new Sequelize('dewi_bahari','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;