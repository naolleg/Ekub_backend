var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { categorySchema } from "./categorySchema.js";
import { prisma } from "../../config/prisma.js";
const categoryController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = categorySchema.register.parse(req.body);
        req.body.totalAmount = req.body.totalCount * (req.body.amount + req.body.commission);
        req.body.totalAmount = req.body.totalCount * req.body.commission;
        const newCategory = yield prisma.category.create({
            data: {
                name: data.name,
                amount: data.amount,
                commission: data.commition,
                totalCount: req.body.totalCount,
                totalAmount: req.body.totalAmount,
                totalCommition: req.body.totalCommition,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'register category',
            data: newCategory
        });
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = categorySchema.update.parse(req.body);
        const categoryExist = yield prisma.category.findFirst({ where: {
                id: +id,
            } });
        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }
        const updateCategory = yield prisma.category.update({
            where: {
                id: +id,
            },
            data: {
                name: data.name,
                amount: data.amount,
                commission: data.commition,
                totalCount: req.body.totalCount,
                totalAmount: req.body.totalAmount,
                totalCommition: req.body.totalCommition,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'updated category',
            data: updateCategory
        });
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const categoryExist = yield prisma.category.findFirst({ where: {
                id: +id,
            } });
        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }
        const deletedCategory = yield prisma.category.delete({
            where: {
                id: +id
            }
        });
        return res.status(200).json({
            success: true,
            message: 'category deleted sucessfully',
        });
    }),
};
export default categoryController;
