import { UserCreationAttributes } from "../models/User"
import { jwtService } from "./jwtService";
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
  },

  async login(credentials: {email: string, password: string}) {
    try {
      const {email, password} = credentials;
      

      const user = await userService.findByEmail(email);

      if(!user) throw new Error("Não existe nenhum usuário com esse email");
      if(!user.checkPassword(password)) throw new Error("Credenciais inválidas!");


      const payload = {
        id: user.id,
        firstName: user.firstName,
        email: user.email
      };

      const accessToken = jwtService.signToken(payload, '15m');

      return {
        access_token: accessToken
      };
    } catch (error) {
      throw error;
    }
  }
}