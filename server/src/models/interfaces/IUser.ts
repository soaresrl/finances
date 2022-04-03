import { Document } from 'mongoose'

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    expenses_id: string[];
    incomes_id: string[];
}