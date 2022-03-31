import { ExpenseRepository } from "../repositories/implementations/ExpenseRepository";
import { IncomeRepository } from "../repositories/implementations/IncomeRepository";
import { CreateExpenseController } from "./CreateExpense/CreateExpenseController";
import { CreateExpenseUseCase } from "./CreateExpense/CreateExpenseUseCase";
import { CreateIncomeController } from "./CreateIncome/CreateIncomeController";
import { CreateIncomeUseCase } from "./CreateIncome/CreateIncomeUseCase";
import { FindAllExpensesController } from "./FindAllExpenses/FindAllExpensesController";
import { FindAllExpensesUseCase } from "./FindAllExpenses/FindAllExpensesUseCase";
import { FindAllIncomesController } from "./FindAllIncomes/FindAllIncomesController";
import { FindAllIncomesUseCase } from "./FindAllIncomes/FindAllIncomesUseCase";
import { FindExpenseByNameController } from "./FindExpenseByName/FindExpenseByNameController";
import { FindExpenseByNameUseCase } from "./FindExpenseByName/FindExpenseByNameUseCase";
import { FindIncomeByNameController } from "./FindIncomeByName/FindIncomeByNameController";
import { FindIncomeByNameUseCase } from "./FindIncomeByName/FindIncomeByNameUseCase";

// Expenses Use Cases and Controllers
const expenseRepository = new ExpenseRepository();

const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
  
const createExpenseController = new CreateExpenseController(createExpenseUseCase);

const findExpenseByNameUseCase = new FindExpenseByNameUseCase(expenseRepository);

const findExpenseByNameController = new FindExpenseByNameController(findExpenseByNameUseCase);

const findAllExpensesUseCase = new FindAllExpensesUseCase(expenseRepository);

const findAllExpensesController = new FindAllExpensesController(findAllExpensesUseCase);

// Incomes Use Cases and Controllers

const incomeRepository = new IncomeRepository();

const createIncomeUseCase = new CreateIncomeUseCase(incomeRepository);

const createIncomeController = new CreateIncomeController(createIncomeUseCase);

const findIncomeByNameUseCase = new FindIncomeByNameUseCase(incomeRepository);

const findIncomeByNameController = new FindIncomeByNameController(findIncomeByNameUseCase);

const findAllIncomesUseCase = new FindAllIncomesUseCase(incomeRepository);

const findAllIncomesController = new FindAllIncomesController(findAllIncomesUseCase);
  
export { 
    createExpenseController, 
    findExpenseByNameController, 
    findAllExpensesController, 
    createIncomeController, 
    findIncomeByNameController,
    findAllIncomesController
}