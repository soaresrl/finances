import { IIncomeRepository } from "../../repositories/interfaces/IIncomeRepository";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class DeleteIncomeUseCase {
    constructor(private userRepository: IUserRepository,private incomeRepository: IIncomeRepository){}

    async execute(userId: string, id: any): Promise<void>{
        try{
            await this.incomeRepository.delete(id);

            const incomesIds = await this.userRepository.getIncomesIds(userId) as string[];

            const filteredIds = incomesIds.filter(incomesId => incomesId !== id);

            await this.userRepository.updateIncomesIds(userId, filteredIds);
        } catch(error){
            throw new Error('Could not delete expense.');
        }
    }
}