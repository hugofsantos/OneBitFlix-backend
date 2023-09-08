import { courseModel } from "../models";

export const courseService = {  
  getRandomFeaturedCourses: async () => {
    const featuredNumber = 3; // Quantidade de featured courses que será retornada


    try {
      const featuredCourses = await courseModel.findAll({
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ],
        where: {
          featured: true
        }        
      });

      const randomFeaturedCourses = featuredCourses.sort((course1, course2) => 0.5 - Math.random());

      return randomFeaturedCourses.slice(0, featuredNumber);
    } catch (err) {
      throw err;
    }
  },
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
  },
  getTopTenNewest: async () => {
    try {
      const courses = await courseModel.findAll({
        limit: 10,
        order: [['created_at', 'DESC']]
      });

      return courses;
    } catch (err) {
      throw err;
    }
  }
};