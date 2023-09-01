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
  }
}