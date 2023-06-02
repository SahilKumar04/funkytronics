import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  pinCode: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
})
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    address: {
      type: [AddressSchema],
      default: undefined
    },
    currentAddress: {
      type: Object
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
