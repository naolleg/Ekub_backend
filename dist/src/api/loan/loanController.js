var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loanSchema } from "./loanSchema.js";
import { prisma } from "../../config/prisma.js";
const loanController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = loanSchema.register.parse(req.body);
        const isLotExist = yield prisma.loans.findFirst({
            where: {
                lotId: +data.lotId
            }
        });
        if (!isLotExist) {
            return res.status(404).json({
                success: false,
                message: 'lot not found'
            });
        }
        const newLoan = yield prisma.loans.create({
            data: {
                amount: +data.amount,
                lotId: +data.lotId,
                userId: +req.user.id
            }
        });
        return res.status(200).json({
            success: true,
            message: 'register loan',
            data: newLoan
        });
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = loanSchema.update.parse(req.body);
        const id = req.params.id;
        //check if exist
        const isLoanExist = yield prisma.loans.findFirst({
            where: {
                id: +id,
            }
        });
        if (!isLoanExist) {
            return res.status(404).json({
                success: false,
                message: 'loan not found'
            });
        }
        const updatedLoan = yield prisma.loans.update({
            where: {
                id: +id
            },
            data: {
                amount: +data.amount
            }
        });
        return res.status(200).json({
            success: true,
            message: 'updated loan',
            data: updatedLoan
        });
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        //check if exist
        const isLoanExist = yield prisma.loans.findFirst({
            where: {
                id: +id,
            }
        });
        if (!isLoanExist) {
            return res.status(404).json({
                success: false,
                message: 'loan not found'
            });
        }
        const deletedLoan = yield prisma.loans.delete({
            where: {
                id: +id
            }
        });
        return res.status(200).json({
            success: true,
            message: 'deleted loan',
            data: deletedLoan
        });
    }),
};
export default loanController;
