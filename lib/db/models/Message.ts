import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  content: string;
  userId: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
