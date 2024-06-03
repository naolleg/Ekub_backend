var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { winnerSchema } from "./winnerSchema.js";
import { prisma } from "../../config/prisma.js";
const winnerController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = winnerSchema.register.parse(req.body);
        const isLotExist = yield prisma.lots.findFirst({
            where: {
                id: +data.lotId,
            },
        });
        if (!isLotExist) {
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        //check if the winner is registered before
        const isWinnerExist = yield prisma.winners.findFirst({
            where: {
                lotId: +data.lotId,
            },
        });
        if (isWinnerExist) {
            return res.status(404).json({
                success: false,
                message: "winner is already registered",
            });
        }
        const newWinner = yield prisma.winners.create({
            data: {
                lotId: +data.lotId,
                registeredBy: +req.user.id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "winner registered sucessfully",
            data: newWinner,
        });
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = winnerSchema.register.parse(req.body);
        const id = req.params.id;
        //check if the winner exist
        const isWinnerExist = yield prisma.winners.findFirst({
            where: {
                id: +id,
            },
        });
        if (!isWinnerExist) {
            return res.status(404).json({
                success: false,
                message: "winner not found",
            });
        }
        const updatedWinner = yield prisma.winners.update({
            where: {
                id: +id,
            },
            data: {
                lotId: +data.lotId,
                registeredBy: +req.user.id
            },
        });
        return res.status(200).json({
            success: true,
            message: "winner updated sucessfully",
        });
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = winnerSchema.register.parse(req.body);
        const id = req.params.id;
        //check if the winner exist
        const isWinnerExist = yield prisma.winners.findFirst({
            where: {
                id: +id,
            },
        });
        if (!isWinnerExist) {
            return res.status(404).json({
                success: false,
                message: "winner not found",
            });
        }
        const deletedWinner = yield prisma.winners.delete({
            where: {
                id: +id,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'winner deleted sucessfully',
        });
    }),
};
export default winnerController;
