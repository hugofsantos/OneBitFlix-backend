import { Request, Response } from "express";
import { UserCreationAttributes } from "../models/User";
import { authService } from "../services/authService";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        birth
      }: UserCreationAttributes = req.body

      const createdUser = await authService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
        birth,
        role: 'user'
      });

      return res.status(201).json(createdUser);
    } catch (error) {
      if(error instanceof Error)
        return res.status(400).json({message: error.message});
    }
  }
};