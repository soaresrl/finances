import { Document } from 'mongoose'

export interface IIncome extends Document {
    name: string;
    value: number;
    date: Date;
}