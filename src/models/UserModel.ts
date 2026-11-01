import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      required: true,
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model("User", userSchema);
export default UserModel;
