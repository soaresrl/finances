import { IIncome } from "../../models/interfaces/IIncome";

export interface IIncomeRepository {
    findByName(name: String): Promise<Array<IIncome>>;
    findAll(userId: string): Promise<IIncome[]>;
    save(income: IIncome): Promise<IIncome & {_id: any}>;
    delete(id: string): Promise<void>;
}