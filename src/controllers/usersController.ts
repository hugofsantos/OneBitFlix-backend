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
  // PUT /users/current/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { currentPassword, newPassword} = req.body;

    try {
      if(!user.checkPassword(currentPassword)) // Se a senha não for correta
        return res.status(401).json("Acesso negado: A senha informada não corresponde a senha atual do usuário!")
      
      await userService.updatePassword(user.id, newPassword);
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao atualizar senha do usuário atual" });
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