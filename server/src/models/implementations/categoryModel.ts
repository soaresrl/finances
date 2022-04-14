import {model, Model} from 'mongoose';
import { CategorySchema } from '../../schemas/categorySchema';
import { ICategory } from '../interfaces/ICategory';

const Category: Model<ICategory> = model('category', CategorySchema);

export { Category };