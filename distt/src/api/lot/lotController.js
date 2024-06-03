var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { lotSchema } from "./lotSchema.js";
import { prisma } from "../../config/prisma.js";
const lotController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = lotSchema.register.parse(req.body);
        const categoryExist = yield prisma.category.findFirst({ where: {
                id: +data.categoryId,
            } });
        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }
        const newLot = yield prisma.lots.create({
            data: {
                isCompleted: false,
                categoryId: data.categoryId,
                registeredBy: req.user.id,
                remaingDay: +categoryExist.totalCount,
                remaingAmount: +categoryExist.totalAmount,
                profile: {
                    create: {
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        gender: data.gender,
                        userId: req.user.id,
                        image_url: data.image_url,
                        address: {
                            create: {
                                city: data.city,
                                subcity: data.subcity,
                                werede: data.woreda,
                                housenumber: data.housenumber
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            message: 'lot register successfully',
            data: newLot
        });
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = lotSchema.update.parse(req.body);
        const id = req.params.id;
        const isLotExist = yield prisma.lots.findFirst({
            where: {
                id: +id,
            }
        });
        if (!isLotExist) {
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const updatedLot = yield prisma.lots.update({
            where: {
                id: +id,
            },
            data: {
                isCompleted: data.isCompleted,
                remaingAmount: data.remaingAmount,
                remaingDay: data.remaingDay,
            }
        });
        return res.status(200).json({
            success: true,
            message: "loto successfully updated",
            data: updatedLot
        });
    }),
    updateProfile: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = lotSchema.updateProfile.parse(req.body);
        const id = req.params.id;
        const isLotExist = yield prisma.lots.findFirst({
            where: {
                id: +id,
            }
        });
        if (!isLotExist) {
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const isProfileExist = yield prisma.profile.findFirst({
            where: {
                id: +isLotExist.id
            }
        });
        if (!isProfileExist) {
            return res.status(404).json({
                success: false,
                message: "lot profile not found",
            });
        }
        const updatedProfile = yield prisma.profile.update({
            where: {
                id: +isProfileExist.id,
            },
            data: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                gender: data.gender,
                userId: req.user.id,
            }
        });
        return res.status(200).json({
            success: true,
            message: "profile successfully updated",
            data: updatedProfile
        });
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const isLotExist = yield prisma.lots.findFirst({
            where: {
                id: +id,
            }
        });
        if (!isLotExist) {
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const deletedLot = yield prisma.lots.delete({
            where: {
                id: +id,
            }
        });
        return res.status(200).json({
            success: true,
            message: "lot successfully deleted",
        });
    }),
};
export default lotController;
