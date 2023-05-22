import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    userId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        max: 9999999999,
        trim: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        trim: true,
        required: true,
        lowercase: true
    },
    address: [{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }],
    currentAddress: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;