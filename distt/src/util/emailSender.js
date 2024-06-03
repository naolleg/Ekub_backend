var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from '../config/secrets.js';
export const sendEmail = (user_email, v_code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: EMAIL,
            to: user_email,
            subject: "text",
            text: `your verification code is ${v_code}`,
        };
        yield transporter.sendMail(mailOptions);
        return { success: true, message: "Email sent successfully!" };
    }
    catch (error) {
        throw error;
        return { success: false, message: error.message };
    }
});
