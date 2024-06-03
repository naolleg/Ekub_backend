var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { depositSchema } from "./depositSchema.js";
import { prisma } from "../../config/prisma.js";
const depositController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = depositSchema.register.parse(req.body);
        const newDeposit = yield prisma.deposits.create({
            data: {
                catgoryId: req.category.id,
                amount: +data.amount,
                remaining: +data.remaining,
                userId: +req.user.id,
                lotId: +data.lotId,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'register deposit',
            data: newDeposit
        });
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = depositSchema.update.parse(req.body);
        const id = req.params.id;
        const isDepositExist = yield prisma.deposits.findFirst({
            where: {
                id: +id
            }
        });
        if (!isDepositExist) {
            return res.status(404).json({
                success: false,
                message: "deposit not found"
            });
        }
        const updateDeposit = yield prisma.deposits.update({
            where: {
                id: +id,
            },
            data: {
                amount: +data.amount,
                remaining: +data.remaining
            }
        });
        return res.status(200).json({
            success: true,
            message: 'updated deposit',
            data: updateDeposit
        });
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const isDepositExist = yield prisma.deposits.findFirst({
            where: {
                id: +id
            }
        });
        if (!isDepositExist) {
            return res.status(404).json({
                success: false,
                message: "deposit not found"
            });
        }
        const deletedDeposit = yield prisma.deposits.delete({
            where: {
                id: +id
            }
        });
        return res.status(200).json({
            success: true,
            message: 'deposit deleted sucessfully',
        });
    }),
};
export default depositController;
