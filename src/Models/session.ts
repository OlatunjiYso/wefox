import mongoose from 'mongoose';

export interface SessionDocument extends mongoose.Document {
    userId: string;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
  }
const Schema = mongoose.Schema;
const SessionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userAgent: { type: String}
}, { timestamps: true });


export const Session = mongoose.model<SessionDocument>('session', SessionSchema);