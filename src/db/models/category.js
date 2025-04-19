import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'Incomes',
        'Main expenses',
        'Products',
        'Car',
        'Self care',
        'Child care',
        'Household products',
        'Education',
        'Leisure',
        'Other expenses',
        'Entertainment',
      ],
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

export const CategoryCollection = model('Category', categorySchema);
