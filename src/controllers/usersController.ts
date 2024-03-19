import { AuthenticatedRequest } from "../middlewares/jwtAuth";
import { Response } from "express";
import { userService } from "../services/userService";

export const usersController = {
  //GET users/current/watching
  async watching(req: AuthenticatedRequest, res: Response) {
    const userId = req.user!.id;

    try {
      const watching = await userService.getKeepWatching(Number(userId));

      return res.status(200).json(watching);  
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao buscar episódios assistidos" });      
    }
  }
};