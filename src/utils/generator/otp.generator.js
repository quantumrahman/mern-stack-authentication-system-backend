// import module ------------------------------------------->
import crypto from 'crypto';

// generator function -------------------------------------->
const generatorOtp = (length = 6) => {
    if (length <= 0) {
        throw new Error('OTP length must be greater than 0');
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length;

    const otp = crypto.randomInt(min, max);

    return otp.toString();
}

// export module ------------------------------------------->
export default generatorOtp;