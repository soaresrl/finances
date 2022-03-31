import { model, Model } from "mongoose";
import { IIncome } from "../interfaces/IIncome";
import { IncomeSchema } from "../../schemas/incomeSchema";

const Income: Model<IIncome> = model('Income', IncomeSchema);

export { Income };