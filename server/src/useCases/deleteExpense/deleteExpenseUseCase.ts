import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class DeleteExpenseUseCase {
    constructor(private userRepository: IUserRepository,private expenseRepository: IExpenseRepository){}

    async execute(userId: string, id: any): Promise<void>{
        try{
            await this.expenseRepository.delete(id);

            const expensesIds = await this.userRepository.getExpensesIds(userId) as string[];

            const filteredIds = expensesIds.filter(expenseId => expenseId !== id);

            await this.userRepository.updateExpensesIds(userId, filteredIds);

        } catch(error){
            throw new Error('Could not delete expense.');
        }
    }
}