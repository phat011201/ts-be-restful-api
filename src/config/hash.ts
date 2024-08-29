import crypto from "crypto";
import { HASH_ALGORITHM, HASH_ENCODING } from "./config";

/**
 * @param value 
 * @returns 
 */
export const hash = (value: string): string => {
    return crypto.createHash(HASH_ALGORITHM).update(value).digest(HASH_ENCODING);
}

/**
 * @param value 
 * @param hash 
 * @returns 
 */
export const verify = (value: string, hash: string): boolean => {
    return crypto.createHash(HASH_ALGORITHM).update(value).digest(HASH_ENCODING) === hash;
}