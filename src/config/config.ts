import { BinaryToTextEncoding } from "crypto";
import dotenv from "dotenv";
import { Dialect } from "sequelize";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Environment variables
 */
export const NODE_ENV: string = process.env.NODE_ENV as string;
export const DEVELOPMENT: boolean = NODE_ENV === "development";
export const PRODUCTION: boolean = NODE_ENV === "production";
export const TESTING: boolean = NODE_ENV === "testing";

/**
 * Server configuration
 */
export const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
export const DOMAIN: string = `${PORT}-${process.env.WEB_HOST}`;

/**
 * JWT configuration
 */
export const JWT_TOKEN_SECRET: string = process.env.JWT_TOKEN_SECRET as string;

/**
 * Database configuration
 */
export const DATABASE_NAME: string = process.env.DATABASE_NAME as string;
export const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME as string;
export const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD as string;
export const DATABASE_HOST: string = process.env.DATABASE_HOST as string;
export const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT as string, 10) || 5432;
export const DATABASE_DIALECT: Dialect = process.env.DATABASE_DIALECT as Dialect;
export const DATABASE_STORAGE: string = process.env.DATABASE_STORAGE as string;

/**
 * Hash configuration
 */
export const HASH_ALGORITHM: string = process.env.HASH_ALGORITHM as string;
export const HASH_ENCODING: BinaryToTextEncoding = process.env.HASH_ENCODING as BinaryToTextEncoding;
