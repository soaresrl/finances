import { model, Model } from "mongoose";
import { IExpense } from "../interfaces/IExpense";
import { ExpenseSchema } from "../../schemas/expenseSchema";

const Expense: Model<IExpense> = model('Expense', ExpenseSchema);

export { Expense };