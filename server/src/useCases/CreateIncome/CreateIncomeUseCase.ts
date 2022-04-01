import { IIncome } from "../../models/interfaces/IIncome";
import { IIncomeRepository } from "../../repositories/interfaces/IIncomeRepository";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository){}

    async execute(income: IIncome): Promise<void> {
        try{
            this.incomeRepository.save(income);
        }catch(error){
            throw new Error('Could not create income on database.');
        }
    }
}