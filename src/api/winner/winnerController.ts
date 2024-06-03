import { NextFunction, Request, Response } from "express";
import { winnerSchema } from "./winnerSchema.js";
import { prisma } from "../../config/prisma.js";

const winnerController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const data = winnerSchema.register.parse(req.body);
    const isLotExist = await prisma.lots.findFirst({
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
    const isWinnerExist = await prisma.winners.findFirst({
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

    const newWinner = await prisma.winners.create({
      data: {
        lotId: +data.lotId,
        registeredBy: +req.user!.id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "winner registered sucessfully",
      data: newWinner,
    });
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const data = winnerSchema.register.parse(req.body);
    const id = req.params.id;
    //check if the winner exist
    const isWinnerExist = await prisma.winners.findFirst({
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
    const updatedWinner = await prisma.winners.update({
      where: {
        id: +id,
      },
      data: {
        lotId: +data.lotId,
        registeredBy: +req.user!.id
      },
    });

    return res.status(200).json({
      success: true,
      message: "winner updated sucessfully",
    });

   
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const data = winnerSchema.register.parse(req.body);
    const id = req.params.id;
    //check if the winner exist
    const isWinnerExist = await prisma.winners.findFirst({
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

    const deletedWinner = await prisma.winners.delete({
        where:{
            id: +id,
        }
    });
    return res.status(200).json({
        success: true,
        message: 'winner deleted sucessfully',
    })
  },
};

export default winnerController;
