import { IExpense } from "../../models/interfaces/IExpense";
import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class CreateExpenseUseCase {
    constructor(private userRepository: IUserRepository, private expenseRepository: IExpenseRepository){}

    async execute(userId: string, data: IExpense): Promise<IExpense & {_id: any}> {
        try{
            const newExpense = await this.expenseRepository.save(data)
            const expensesIds = await this.userRepository.getExpensesIds(userId) as string[];

            this.userRepository.updateExpensesIds(userId, [...expensesIds, newExpense._id.toString()]);

            return newExpense;
        }catch(error){
            throw new Error('Could not insert expense on database.');
        }
    }
}