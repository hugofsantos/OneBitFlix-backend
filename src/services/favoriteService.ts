import { favoriteModel } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = favoriteModel.create({
      courseId,
      userId
    });

    return favorite;
  }
};