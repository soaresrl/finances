import { Document } from 'mongoose';

export interface ICategory extends Document {
    type: string,
    userId: string
}