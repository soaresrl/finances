import { IExpense } from "../../models/interfaces/IExpense";
import { Expense } from "../../models/implementations/expenseModel";
import { IExpenseRepository } from "../interfaces/IExpenseRepository";

export class ExpenseRepository implements IExpenseRepository{
    async findByName(name: String): Promise<IExpense[]> {
        const expenses: IExpense[] = await Expense.find({ name });

        return expenses;
    }

    async findAll(): Promise<IExpense[]> {
        const expenses: IExpense[] = await Expense.find({});

        return expenses;
    }

    async save(expense: IExpense): Promise<void> {
        const expenseModel = new Expense(expense);

        await expenseModel.save();
    }
}