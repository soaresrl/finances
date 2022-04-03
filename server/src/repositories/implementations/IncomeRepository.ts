import { IIncome } from "../../models/interfaces/IIncome";
import { Income } from "../../models/implementations/incomeModel";
import { IIncomeRepository } from "../interfaces/IIncomeRepository";

export class IncomeRepository implements IIncomeRepository{
    async findByName(name: String): Promise<IIncome[]> {
        const incomes: Array<IIncome> = await Income.find({ name });

        return incomes;
    }

    async findAll(userId: string): Promise<IIncome[]> {
        const incomes: Array<IIncome> = await Income.find({userId});

        return incomes;
    }

    async save(income: IIncome): Promise<IIncome & {_id: any}> {
        const incomeModel = new Income(income);

        return await incomeModel.save();
    }

    async delete(id: string): Promise<void> {
        await Income.deleteOne({ _id: id });
    }
}