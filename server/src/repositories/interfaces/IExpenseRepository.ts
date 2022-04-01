import { IExpense } from "../../models/interfaces/IExpense";

export interface IExpenseRepository {
    findByName(name: String): Promise<IExpense[]>;
    findAll(): Promise<IExpense[]>;
    save(expense: IExpense): Promise<void>;
}