import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 5,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);
userSchema.pre("save", async function (next) {
  // "this" is the user doc
  if (!this.isModified("password")) return next();
  // if the password has changed, we need to update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

  return next();
});

const Users = mongoose.model("User", userSchema);

export default Users;
