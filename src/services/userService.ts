import { userModel } from "../models";
import { UserCreationAttributes } from "../models/User";

export const userService = {
  async findByEmail(email: string) {
    try {
      const user = await userModel.findOne({
        where: {email}
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  async create(attributes: UserCreationAttributes) {
    try {
      const user = await userModel.create(attributes);

      return user;
    } catch (error) {
      throw error;  
    }
  }
};