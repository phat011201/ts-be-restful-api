import { ResponsePayload } from "#payload/reponsePayload";

export interface ICRUDService<Q, S, ID = string> {
    getAll: () => Promise<ResponsePayload<S[]>>;
    getById: (id: ID) => Promise<ResponsePayload<S>>;
    create: (data: Q) => Promise<ResponsePayload<S>>;
    update: (id: ID, data: Q) => Promise<ResponsePayload<S>>;
    delete: (id: ID) => Promise<ResponsePayload<S>>;
}