import { LikeModel } from "../models/Like";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const like = await LikeModel.create({
      userId,
      courseId
    });

    return like;
  },
  remove: async (userId: number, courseId: number) => {
    await LikeModel.destroy({where: {userId, courseId}});
  },
  isLiked: async (userId: number, courseId: number) => {
    const like = await LikeModel.findOne({where: {userId, courseId}});

    return like !== null;
  }
};