import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const Category = model('category', categorySchema);
