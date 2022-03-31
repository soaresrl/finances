import { IIncome } from "../../models/interfaces/IIncome";
import { Income } from "../../models/implementations/incomeModel";
import { IIncomeRepository } from "../interfaces/IIncomeRepository";

export class IncomeRepository implements IIncomeRepository{
    async findByName(name: String): Promise<IIncome[]> {
        const incomes: Array<IIncome> = await Income.find({ name });

        return incomes;
    }

    async findAll(): Promise<IIncome[]> {
        const incomes: Array<IIncome> = await Income.find();

        return incomes;
    }

    async save(income: IIncome): Promise<void> {
        const incomeModel = new Income(income);

        await incomeModel.save();
    }
}