import { categoryModel } from "../models";

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    try {
      const offset = (page - 1) * perPage;

      const { rows: categories, count: total } = await categoryModel.findAndCountAll({
        order: [['position', 'ASC']],
        limit: perPage,
        offset
      });

      return {
        categories,
        page,
        perPage,
        total        
      };
    }catch(err) {
      throw err;
    }
  },
  findByIdWithCourses: async (id: string) => {
    try {
      const categorieWithCourses = await categoryModel.findByPk(id, {
        attributes: ['id', 'name'],
        include: {
          association: 'courses',
          attributes: [
            'id',
            'name',
            'synopsis',
            ['thumbnail_url', 'thumbnailUrl']
          ]
        }
      });

      return categorieWithCourses;
    } catch (err) {
      throw err;
    }
  }
}