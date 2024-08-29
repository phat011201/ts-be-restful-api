import { sequelize } from "#config/database";
import { DataTypes, Model } from "sequelize";

export interface IRoleAttributes {
    id?: string;
    name: string;
}

class Role extends Model<IRoleAttributes> implements IRoleAttributes {
    public id!: string;
    public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "roles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
    }
);

export { Role };
