// Define a Mongoose schema for users
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; //Encryption

export interface IUser extends mongoose.Document {
  username: string;
  hashedPassword: string;
  checkPassword: (password: string) => boolean;
}

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true },
  hashedPassword: String,
});

// Add a checkPassword method to the User schema to compare user passwords
UserSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.hashedPassword);
};

// Define a Mongoose model for users
export const User = mongoose.model<IUser>('User', UserSchema);