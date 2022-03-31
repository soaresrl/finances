import { IExpense } from "../../models/interfaces/IExpense";
import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";

export class FindAllExpensesUseCase {
    constructor(private expenseRepository: IExpenseRepository){}

    async execute(): Promise<IExpense[]> {
        try{
            const expenses: IExpense[] = await this.expenseRepository.findAll();

            return expenses;
        } catch(error){
            throw new Error('Could not find any expenses.');
        }
    }
}