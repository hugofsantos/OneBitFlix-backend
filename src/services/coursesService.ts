import { courseModel } from "../models";

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    try {
      const courseWithEpisodes = await courseModel.findByPk(id, {
        attributes: [
          'id', 
          'name', 
          'synopsis', 
          ['thumbnail_url', 'thumbnailUrl']
        ],
        include: {
          association: 'episodes',
          attributes: [
            'id', 
            'name', 
            'synopsis', 
            'order', 
            ['video_url', 'videoUrl'],
            ['seconds_long', 'secondsLong']
          ],
          order: [['order', 'ASC']],
          separate: true // Para rodar o include em uma query separada (Necessário para conseguir usar o order do objeto include) 
        }
      });

      return courseWithEpisodes;
    } catch (err) {
      throw err;
    }
  }
};