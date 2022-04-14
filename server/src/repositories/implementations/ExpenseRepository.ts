import { IExpense } from "../../models/interfaces/IExpense";
import { Expense } from "../../models/implementations/expenseModel";
import { IExpenseRepository } from "../interfaces/IExpenseRepository";

export class ExpenseRepository implements IExpenseRepository{
    async findByName(name: String): Promise<IExpense[]> {
        const expenses: IExpense[] = await Expense.find({ name });

        return expenses;
    }

    async findAll(userId: string): Promise<IExpense[]> {
        const expenses: IExpense[] = await Expense.find({userId});

        return expenses;
    }

    async filterByCategory(userId:string, category: string): Promise<IExpense[]> {
        const expenses: IExpense[] = await Expense.find({ userId, category });

        return expenses;
    }

    async save(expense: IExpense): Promise<IExpense & {_id: any}> {
        const expenseModel = new Expense(expense);

        return await expenseModel.save();
    }

    async delete(id: any): Promise<void> {
        await Expense.deleteOne({ _id: id });
    }
}