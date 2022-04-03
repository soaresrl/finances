import { IIncome } from "../../models/interfaces/IIncome";
import { IIncomeRepository } from "../../repositories/interfaces/IIncomeRepository";

export class FindAllIncomesUseCase {
    constructor(private incomeRepository: IIncomeRepository){}

    async execute(userId: string): Promise<IIncome[]> {
        try{
            const incomes: IIncome[] = await this.incomeRepository.findAll(userId);

            return incomes;
        }catch(error){
            throw new Error('Could not find any income on database.');
        }
    }
}