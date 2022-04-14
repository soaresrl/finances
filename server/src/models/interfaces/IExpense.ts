import { Document } from 'mongoose'

export interface IExpense extends Document {
    name: string;
    value: number;
    date: Date;
    category: string;
    userId: string;
}