import { Schema } from 'mongoose';

export const IncomeSchema: Schema = new Schema({
    name: { type: String, required: true},
    value: { type: Number, get: getPrice, set: setPrice, required: true},
    date: {type: Date, required: true},
    userId: {type: String, required: true}
}, {toJSON: {getters: true}});

function getPrice(num: number){
    return (num/100).toFixed(2);
}

function setPrice(num: number){
    return num*100;
}