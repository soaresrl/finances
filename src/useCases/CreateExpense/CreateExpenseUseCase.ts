import { IExpense } from "../../models/interfaces/IExpense";
import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";

export class CreateExpenseUseCase {
    constructor(private expenseRepository: IExpenseRepository){}

    async execute(data: IExpense): Promise<void> {
        try{
            this.expenseRepository.save(data);
        }catch(error){
            throw new Error('Could not insert expense on database.');
        }
    }
}