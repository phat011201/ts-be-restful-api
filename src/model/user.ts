import { sequelize } from "#config/database";
import { DataTypes, Model } from "sequelize";
import { Role } from "./role";

export interface IUserAttributes {
    id?: string;
    email: string;
    password: string;
    roleId: string;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public roleId!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: Role,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
    }
);

User.belongsTo(Role, { foreignKey: "roleId" });

export { User };
