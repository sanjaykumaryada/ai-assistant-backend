import { model, Schema } from "mongoose";
const userSchema = new Schema({
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
}, {
    timestamps: true,
});
const UserModel = model("User", userSchema);
export default UserModel;
//# sourceMappingURL=UserModel.js.map