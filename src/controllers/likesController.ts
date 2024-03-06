import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/jwtAuth";
import { likeService } from "../services/likeService";

export const likesController = {
  // POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = Number(req.body.courseId);
    
    try {
      const like = await likeService.create(userId, courseId);

      return res.status(201).json(like);
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao dar like no curso" });
    }
  },
  // DELETE /likes/:id
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = Number(req.params.id);
    
    try {
      await likeService.remove(userId, courseId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao dar like no curso" });
    }    
  }
};