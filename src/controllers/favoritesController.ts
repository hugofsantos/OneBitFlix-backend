import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/jwtAuth";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {
  // POST /favorites
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const {courseId} = req.body;

    try {
      const favorite = await favoriteService.create(userId, Number(courseId));

      return res.status(201).json(favorite);
    } catch (error) {
      return res.status(500).json({message: (error as any).message ?? "Ocorreu algum erro ao favoritar curso"});
    }
  }
};