import { courseModel } from "../models";
import { Op } from "sequelize";

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
  },
  getTopTenByLikes: async () => {
    const result = await courseModel.sequelize?.query(
      `SELECT 
        c.id,
        c.name,
        c.synopsis,
        c.thumbnail_url AS thumbnailUrl,
        COUNT(u.id) AS likes 
      FROM courses c LEFT OUTER JOIN likes l
        ON c.id = l.course_id JOIN users u ON
        u.id = l.user_id
      GROUP BY c.id
      ORDER BY likes DESC
      LIMIT 10;`
    );

    if(result) {
      const [topTen] = result;

      return topTen;
    }

    return null;
  },

  findByName: async (name: string, page: number, perPage: number) => {
    try {
      const offset = (page - 1) * perPage; 

      const {count: total, rows: courses} = await courseModel.findAndCountAll({
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ],
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        limit: perPage,
        offset
      });

      return  {
        courses,
        total,
        page,
        perPage
      };
    } catch (err) {
      throw err;
    }
  }
};