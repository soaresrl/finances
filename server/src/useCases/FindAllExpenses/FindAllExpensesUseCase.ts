import { IExpense } from "../../models/interfaces/IExpense";
import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";

export class FindAllExpensesUseCase {
    constructor(private expenseRepository: IExpenseRepository){}

    async execute(userId: string): Promise<IExpense[]> {
        try{            
            const expenses: IExpense[] = await this.expenseRepository.findAll(userId);

            return expenses;
        } catch(error){
            throw new Error('Could not find any expenses.');
        }
    }
}