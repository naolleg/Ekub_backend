var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { SECRET } from "../config/secrets.js";
import { prisma } from "../config/prisma.js";
import { ROLE } from "@prisma/client";
const isAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return;
    }
    try {
        const payload = yield jwt.verify(token, SECRET);
        const user = yield prisma.users.findUnique({
            where: {
                id: (payload).id
            }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found', });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({ success: false, message: 'invalide token', });
    }
});
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.user;
    if (admin && admin.role !== ROLE.ADMIN) {
        return res.status(401).json({ success: false, message: 'user not admin', });
    }
    next();
});
export { isAuthUser, isAdmin };
