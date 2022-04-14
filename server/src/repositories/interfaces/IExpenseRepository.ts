import { IExpense } from "../../models/interfaces/IExpense";

export interface IExpenseRepository {
    findByName(name: String): Promise<IExpense[]>;
    findAll(userId: string): Promise<IExpense[]>;
    filterByCategory(userId: string, category: string): Promise<IExpense[]>;
    save(expense: IExpense): Promise<IExpense & {_id: any}>;
    delete(id: any): Promise<void>;
}