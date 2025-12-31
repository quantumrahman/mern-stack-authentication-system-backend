// import module ------------------------------------------->
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// create schema ------------------------------------------->
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minlength: [6, 'Name must be at least 6 characters.'],
            maxlength: [128, 'Name must not be more than 128 characters.'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            match: [/^\S+@\S+\.\S+$/, 'Invalid email address.'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minlength: [8, 'Password must be at least 8 characters.'],
            maxlength: [64, 'Password must not be more than 64 characters.'],
            select: false
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationOtp: {
            type: String,
            default: '',
        },
        verificationOtpExpAt: {
            type: Date,
        },
        resetPasswordOtp: {
            type: String,
            default: '',
        },
        resetPasswordOtpExpAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

// hashing password hook ----------------------------------->
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre('findOneAndUpdate', async function () {
    const updateUser = this.getUpdate();

    const userPwd = updateUser?.password || updateUser?.$set?.password;

    if (!userPwd) return;

    const hashedPwd = await bcrypt.hash(userPwd, 10);

    if (updateUser.password) {
        updateUser.password = hashedPwd;
    } else {
        updateUser.$set.password = hashedPwd;
    }
});

// compare password hook ----------------------------------->
userSchema.methods.compareHashPwd = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// create model -------------------------------------------->
const user = mongoose.models.user || mongoose.model('user', userSchema);

// export module ------------------------------------------->
export default user;
