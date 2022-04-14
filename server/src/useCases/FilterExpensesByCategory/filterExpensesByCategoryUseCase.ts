import { IExpenseRepository } from "../../repositories/interfaces/IExpenseRepository";

export default class FilterExpensesByCategoryUseCase {
    constructor(private expenseRepository: IExpenseRepository){}

    async execute(userId: string, category: string){
        try{
            const expenses = await this.expenseRepository.filterByCategory(userId, category);
        
            return expenses;
        } catch(error){
            throw new Error('Could not get any filtered expenses.');
        }        
    }
}