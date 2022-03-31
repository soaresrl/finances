import { connect as mongooseConnect, connection } from 'mongoose';

export const connect = async (): Promise<void> => {
    await mongooseConnect('mongodb://localhost:27017/dbFinances');
}

export const close = async (): Promise<void> => {
    await connection.close();
}