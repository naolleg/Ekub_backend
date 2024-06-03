export const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
};
export const generatePassword = () => {
    // Define the possible characters for the password
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Generate a random password
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
};
