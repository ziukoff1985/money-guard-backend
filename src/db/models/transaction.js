import { model, Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TransactionCollection = model('Transaction', transactionSchema);
