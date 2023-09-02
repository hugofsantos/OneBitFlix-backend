import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginatedParams } from "../helpers/getPaginationParams";

export const categoriesController = {
  index: async (req: Request, res: Response) => { // GET /categories
    const [page, perPage] = getPaginatedParams(req.query);

    try {
      const paginatedCategories = await categoryService.findAllPaginated(page, perPage);

      return res.json(paginatedCategories);
    }catch(err) {
      console.error(err);
      if(err instanceof Error) return res.status(400).json({message: err.message});
    }
  },
  show: async (req: Request, res: Response) => { // GET /categories/:id
    const { id } = req.params;

    try{
      const category = await categoryService.findByIdWithCourses(id);

      return res.json(category);
    }catch(err) {
      console.error(err);
      if (err instanceof Error) return res.status(400).json({ message: err.message });
    }
  }
};