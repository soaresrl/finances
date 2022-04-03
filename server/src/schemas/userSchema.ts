import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    expenses_id: {type: [], required: false},
    incomes_id: {type: [], required: false}
});
