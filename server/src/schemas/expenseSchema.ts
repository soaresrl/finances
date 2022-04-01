import { Schema } from 'mongoose';

export const ExpenseSchema: Schema = new Schema({
    name: { type: String, required: true},
    value: { type: Number, required: true},
    date: {type: Date, required: true}
});