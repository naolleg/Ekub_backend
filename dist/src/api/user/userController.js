var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../../config/prisma.js";
import userSchema from "./userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS } from "@prisma/client";
import { SECRET } from "../../config/secrets.js";
import { generatePassword } from "../../util/generateor.js";
import { sendEmail } from "../../util/emailSender.js";
const userController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = userSchema.register.parse(req.body);
        //check if the email  exist
        const isUserExist = yield prisma.users.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (isUserExist) {
            return res.status(404).json({
                success: false,
                message: "email is used before",
            });
        }
        const password = bcrypt.genSaltSync(10, req.body.password);
        const newUser = yield prisma.users.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                password: password,
                activeStatus: STATUS.ACTIVE,
            },
        });
        return res.status(200).json({
            success: true,
            message: "user created successfully",
            data: newUser,
        });
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = userSchema.login.parse(req.body);
        const user = yield prisma.users.findFirst({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            return res.status(404).json({
                success: false,
                message: "password is incorrect",
            });
        }
        if (user.activeStatus != STATUS.ACTIVE) {
            return res.status(404).json({
                success: false,
                message: "user is not active",
            });
        }
        const payload = {
            id: user.id,
            firstName: user.firstName,
        };
        const token = yield jwt.sign(payload, SECRET);
        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            data: user,
            token: token,
        });
    }),
    changePassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = userSchema.changePassword.parse(req.body);
        if (data.password != data.cpassword) {
            return res.status(404).json({
                success: false,
                message: "password not match",
            });
        }
        const password = bcrypt.genSaltSync(10, req.body.password);
        const updateUser = yield prisma.users.update({
            where: {
                id: req.user.id,
            },
            data: {
                password: password,
            },
        });
        return res.status(200).json({
            success: true,
            message: "password updated successfully",
            data: updateUser,
        });
    }),
    resetPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield prisma.users.findFirst({
            where: {
                id: +id,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        req.body.password = generatePassword();
        const password = bcrypt.genSaltSync(10, req.body.password);
        const updateUser = yield prisma.users.update({
            where: {
                id: +id,
            },
            data: {
                password: password,
            },
        });
        yield sendEmail(user.email, req.body.password);
        return res.status(200).json({
            success: true,
            message: "password updated successfully",
        });
    }),
    changeStatus: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield prisma.users.findFirst({
            where: {
                id: +id,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        const updateUser = yield prisma.users.update({
            where: {
                id: +id,
            },
            data: {
                activeStatus: req.body.activeStatus,
            },
        });
        return res.status(200).json({
            success: true,
            message: "status updated successfully",
            data: updateUser,
        });
    }),
};
export default userController;
