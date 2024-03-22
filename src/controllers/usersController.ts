import { AuthenticatedRequest } from "../middlewares/jwtAuth";
import { Response } from "express";
import { userService } from "../services/userService";

export const usersController = {
  // GET users/account
  show: async (req: AuthenticatedRequest, res: Response) => {
    const currentUser = req.user!;

    try {
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao buscar usuário atual"});
    }
  },
  // PUT /users/current/
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.user!.id;
      const {
        firstName,
        lastName,
        phone,
        birth,
        email        
      } = req.body; 

      const updatedUser = await userService.update(id, {
        firstName,
        lastName,
        phone,
        birth,
        email
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao atualizar usuário atual" });
    }
  },

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