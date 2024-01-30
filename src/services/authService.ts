import { UserCreationAttributes } from "../models/User"
import { userService } from "./userService";

export const authService = {
  async register(user: UserCreationAttributes) {
    try {
      const findedUser = await userService.findByEmail(user.email);

      if(findedUser) throw new Error("Esse email já está cadastrado no sistema");
      
      return await userService.create(user);
    } catch (error) {
      throw error;
    }
  }
}