import { Sequelize, SyncOptions } from "sequelize";
import { DATABASE_DIALECT, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_STORAGE, DATABASE_USERNAME } from "./config";

/**
 * @param syncOptions
 * @param databases
 */
export const connect = async (syncOptions: SyncOptions, ...databases: Sequelize[]): Promise<void> => {
    try {
        await Promise.all(
            databases.map(async (database) => {
                await database.authenticate();
                await database.sync(syncOptions);
                LOGGER.log(`Database connected: ${database.getDatabaseName()}`);
            })
        );
    } catch (e: any) {
        console.error(e.message);
    }
};

/**
 * @param databases 
 */
export const disconnect = async (...databases: Sequelize[]): Promise<void> => {
    try {
        await Promise.all(
            databases.map(async (database) => {
                await database.close();
                LOGGER.log(`Database disconnected: ${database.getDatabaseName()}`);
            })
        );
    } catch (e: any) {
        console.error(e.message);
    }
};

/**
 * @param databases 
 */
export const drop = async (...databases: Sequelize[]): Promise<void> => {
    try {
        await Promise.all(
            databases.map(async (database) => {
                await database.drop();
                LOGGER.log(`Database dropped: ${database.getDatabaseName()}`);
            })
        );
    } catch (e: any) {
        console.error(e.message);
    }
};

export const sequelize = new Sequelize({
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT,
    storage: DATABASE_STORAGE,
    logging: false,
    define: {
        freezeTableName: true,
    },
});
