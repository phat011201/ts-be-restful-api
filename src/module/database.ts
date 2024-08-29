import { sequelize, connect } from "#config/database";
import { hash } from "#config/hash";
import { RoleConstant } from "#constant/roleConstant";
import { Role } from "#model/role";
import { User } from "#model/user";

export const defineDatabase = async () => {
    try {
        LOGGER.log("Synchronizing database");
        LOGGER.log("--------------------------------------------------");
        await connect({ force: true }, sequelize);

        await defineData();

        LOGGER.log("Database synchronized");
    } catch (e: any) {
        LOGGER.error(e.message);
    }
};

const defineData = async () => {
    try {
        LOGGER.log("Inserting data");
        LOGGER.log("--------------------------------------------------");
        await sequelize.sync();

        LOGGER.log("Inserting role");
        const superAdminRole = await Role.create({
            name: RoleConstant.SUPER_ADMIN,
        })

        await Role.create({
            name: RoleConstant.ADMIN,
        });

        await Role.create({
            name: RoleConstant.USER,
        });

        LOGGER.log("Inserting user");
        await User.create({
            email: "huynhtienphat1@gmail.com",
            password: hash("123456"),
            roleId: superAdminRole.getDataValue("id") as string,
        });
        LOGGER.log("Data inserted");
    } catch (e: any) {
        LOGGER.error(e.message);
    }
};
