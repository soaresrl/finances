import { Schema } from 'mongoose';

export const CategorySchema: Schema = new Schema({
    type: {type: String, required: true},
    userId: {type: String, required: true}
})