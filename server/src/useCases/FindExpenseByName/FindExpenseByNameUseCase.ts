import { IExpense } from "../../models/interfaces/IExpense";
import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";

export class FindExpenseByNameUseCase {
    constructor(private expenseRepository: IExpenseRepository){}

    async execute(name: string): Promise<IExpense[]> {
        try{
            const expenses = await this.expenseRepository.findByName(name);

            return expenses;
        }catch(error){
            throw new Error('Could not find expense on database.');
        }
    }
}