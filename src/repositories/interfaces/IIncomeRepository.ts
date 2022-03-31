import { IIncome } from "../../models/interfaces/IIncome";

export interface IIncomeRepository {
    findByName(name: String): Promise<Array<IIncome>>;
    findAll(): Promise<IIncome[]>;
    save(income: IIncome): Promise<void>;
}