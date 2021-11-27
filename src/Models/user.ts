import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    email: string;
    fullName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });


const User = mongoose.model<UserDocument>('user', UserSchema);
export default User;