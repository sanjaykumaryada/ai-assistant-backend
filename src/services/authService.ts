import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

export async function createUserService(email: string, password: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const existingUser = await UserModel.findOne({ email: trimmedEmail });
  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXIST");
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await UserModel.create({ email, passwordHash });

  return {
    id: user?._id.toString(),
    email: user?.email,
  };
}

export async function loginUserService(email: string, password: string) {
  const user = await UserModel.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const isPasswordIsValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordIsValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return {
    id: user?._id.toString(),
    email: user?.email,
  };
}
