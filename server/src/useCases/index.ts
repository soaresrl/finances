import { ExpenseRepository } from "../repositories/implementations/ExpenseRepository";
import { IncomeRepository } from "../repositories/implementations/IncomeRepository";
import UserRepository from "../repositories/implementations/UserRepository";
import { CreateExpenseController } from "./CreateExpense/CreateExpenseController";
import { CreateExpenseUseCase } from "./CreateExpense/CreateExpenseUseCase";
import { CreateIncomeController } from "./CreateIncome/CreateIncomeController";
import { CreateIncomeUseCase } from "./CreateIncome/CreateIncomeUseCase";
import CreateUserController from "./CreateUser/CreateUserController";
import CreateUserUseCase from "./CreateUser/CreateUserUseCase";
import { DeleteExpenseController } from "./deleteExpense/deleteExpenseController";
import { DeleteExpenseUseCase } from "./deleteExpense/deleteExpenseUseCase";
import { DeleteIncomeController } from "./deleteIncome/deleteIncomeController";
import { DeleteIncomeUseCase } from "./deleteIncome/deleteIncomeUseCase";
import { FindAllExpensesController } from "./FindAllExpenses/FindAllExpensesController";
import { FindAllExpensesUseCase } from "./FindAllExpenses/FindAllExpensesUseCase";
import { FindAllIncomesController } from "./FindAllIncomes/FindAllIncomesController";
import { FindAllIncomesUseCase } from "./FindAllIncomes/FindAllIncomesUseCase";
import { FindExpenseByNameController } from "./FindExpenseByName/FindExpenseByNameController";
import { FindExpenseByNameUseCase } from "./FindExpenseByName/FindExpenseByNameUseCase";
import { FindIncomeByNameController } from "./FindIncomeByName/FindIncomeByNameController";
import { FindIncomeByNameUseCase } from "./FindIncomeByName/FindIncomeByNameUseCase";
import FindUserController from "./FindUser/FindUserController";
import FindUserUseCase from "./FindUser/FindUserUseCase";

// Repositories
const expenseRepository = new ExpenseRepository();
const userRepository = new UserRepository();
const incomeRepository = new IncomeRepository();

// Expenses Use Cases and Controllers

const createExpenseUseCase = new CreateExpenseUseCase(userRepository, expenseRepository);
  
const createExpenseController = new CreateExpenseController(createExpenseUseCase);

const findExpenseByNameUseCase = new FindExpenseByNameUseCase(expenseRepository);

const findExpenseByNameController = new FindExpenseByNameController(findExpenseByNameUseCase);

const findAllExpensesUseCase = new FindAllExpensesUseCase(expenseRepository);

const findAllExpensesController = new FindAllExpensesController(findAllExpensesUseCase);

const deleteExpenseUseCase = new DeleteExpenseUseCase(userRepository, expenseRepository);

const deleteExpenseController = new DeleteExpenseController(deleteExpenseUseCase);

// Incomes Use Cases and Controllers

const createIncomeUseCase = new CreateIncomeUseCase(userRepository, incomeRepository);

const createIncomeController = new CreateIncomeController(createIncomeUseCase);

const findIncomeByNameUseCase = new FindIncomeByNameUseCase(incomeRepository);

const findIncomeByNameController = new FindIncomeByNameController(findIncomeByNameUseCase);

const findAllIncomesUseCase = new FindAllIncomesUseCase(incomeRepository);

const findAllIncomesController = new FindAllIncomesController(findAllIncomesUseCase);

const deleteIncomeUseCase = new DeleteIncomeUseCase(userRepository, incomeRepository);

const deleteIncomeController = new DeleteIncomeController(deleteIncomeUseCase);

// Users Use Cases and Controllers

const createUserUseCase = new CreateUserUseCase(userRepository);

const createUserController = new CreateUserController(createUserUseCase);

const findUserUseCase = new FindUserUseCase(userRepository);

const findUserController = new FindUserController(findUserUseCase);
  
export { 
    createExpenseController, 
    findExpenseByNameController, 
    findAllExpensesController,
    deleteExpenseController, 
    createIncomeController, 
    findIncomeByNameController,
    findAllIncomesController,
    deleteIncomeController,
    createUserController,
    findUserUseCase,
    findUserController
}