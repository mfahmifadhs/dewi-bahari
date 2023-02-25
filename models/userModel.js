import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Roles from "../models/roleModel.js";

const { DataTypes } = Sequelize;

const Users = db.define('t_users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'roleModel',
            key: 'ID'
        },
        field: 'roleId'
    },
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    phoneNum: {
        type: DataTypes.BIGINT
    },
    address: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
    passwordText: {
        type: DataTypes.TEXT
    },
    refreshToken: {
        type: DataTypes.TEXT
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

Users.prototype.softDelete = function () {
    this.setDataValue('deletedAt', new Date());
    return this.save();
};

Users.findAllDeleted = function () {
    return this.unscoped().findAll({ where: { deletedAt: { [Sequelize.Op.ne]: null } } });
};

Users.belongsTo(Roles, { foreignKey: 'roleId', targetKey: 'id' })

export default Users;