import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    userId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      max: 9999999999,
      trim: true,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    age: {
      type: Number,
      min: 18,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      trim: true,
      required: true,
      lowercase: true,
    },
    address: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    currentAddress: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
