import { IIncome } from "../../models/interfaces/IIncome";
import { IIncomeRepository } from "../../repositories/interfaces/IIncomeRepository";

export class FindIncomeByNameUseCase {
    constructor(private incomeRepository: IIncomeRepository){}

    async execute(name: string): Promise<IIncome[]>{
        try{
            const incomes = await this.incomeRepository.findByName(name);

            return incomes;
        }catch(error){
            throw new Error('Could not find income with the specified name');
        }
    }
}