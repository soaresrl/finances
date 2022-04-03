import { IIncome } from "../../models/interfaces/IIncome";
import { IIncomeRepository } from "../../repositories/interfaces/IIncomeRepository";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class CreateIncomeUseCase {
    constructor(private userRepository: IUserRepository,private incomeRepository: IIncomeRepository){}

    async execute(userId:string, income: IIncome): Promise<IIncome & {_id: any}> {
        try{
            const newIncome = await this.incomeRepository.save(income);

            const incomesIds = await this.userRepository.getIncomesIds(userId) as string[];

            this.userRepository.updateExpensesIds(userId, [...incomesIds, newIncome._id.toString()]);

            return newIncome;
        }catch(error){
            throw new Error('Could not create income on database.');
        }
    }
}