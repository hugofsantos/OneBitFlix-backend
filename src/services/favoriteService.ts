import { favoriteModel } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = favoriteModel.create({
      courseId,
      userId
    });

    return favorite;
  },
  findFavoriteCoursesByUserId: async (userId: number) => {
    const favorites = await favoriteModel.findAll({
      where: {userId},
      include: {
        association: 'Course',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ],
      },
      attributes: [['user_id', 'userId']]
    });

    return {
      userId,
      courses: favorites.map(favorite => favorite.Course)
    };
  }
};