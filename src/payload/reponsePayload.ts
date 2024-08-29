import { HttpStatus } from "#constant/httpStatus";
import { Response } from "express";

/**
 * Interface for response payload
 * @param T - Type of data (optional) - default undefined
 * @param status - Status of response
 * @param message - Message of response
 * @param data - Data of response (optional) - default undefined
 */
interface IResponsePayload<T = undefined> {
    status: HttpStatus;
    message: string;
    data?: T;
}

/**
 * Response payload
 * @param T - Type of data (optional) - default undefined
 * @implements IResponsePayload
 * @returns Response payload
 */
export class ResponsePayload<T = undefined> {
    public status: HttpStatus;
    public message: string;
    public data?: T;

    /**
     * Constructor
     * @param status - Status of response
     * @param message - Message of response
     * @param data - Data of response (optional) - default undefined
     */
    constructor({ status, message, data }: IResponsePayload<T>) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /**
     * Send response
     * @param res - Response
     * @returns Response
     */
    end = <R extends Response>(res: R) => {
        return res.status(this.status).json({ message: this.message, data: this.data });
    }

    /**
     * Get JSON
     * @returns JSON
     */
    json = () => {
        return { message: this.message, data: this.data };
    }
}
