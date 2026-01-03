// import module ------------------------------------------->
import crypto from 'crypto';

// function ------------------------------------------------>
const otpHashing = (otp) => {
    if (typeof otp !== 'string') {
        throw new Error('OTP must be a string fromat');
    }

    const hashOtp = crypto.createHash('sha256').update(otp).digest('hex');

    return hashOtp;
};

// export module ------------------------------------------->
export default otpHashing;
