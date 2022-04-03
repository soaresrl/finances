import { model, Model } from "mongoose";
import { UserSchema } from "../../schemas/userSchema";
import { IUser } from "../interfaces/IUser";

const User: Model<IUser> = model('User', UserSchema);

export { User };