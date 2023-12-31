import { Request, Response } from "express";
import { courseService } from "../services/coursesService";
import { getPaginatedParams } from "../helpers/getPaginationParams";

export const coursesController = {
  featured: async (req: Request, res: Response) => { // GET /courses/featured
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();

      return res.json(featuredCourses);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ message: err.message })
    }
  },
  newest: async (req: Request, res: Response) => { // GET /courses/newest
    try {
      const newestCourses = await courseService.getTopTenNewest();

      return res.json(newestCourses);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ message: err.message })
    }
  },
  show: async (req: Request, res: Response) => { // GET /courses/:id
    const { id } = req.params;

    try{
      const course = await courseService.findByIdWithEpisodes(id);

      return res.json(course);
    }catch(err) {
      if(err instanceof Error) return res.status(400).json({message: err.message})
    }
  },
  search: async (req: Request, res: Response) => { // GET /courses/search?name="valor_do_nome"
    const {name} = req.query;
    const [page, perPage] = getPaginatedParams(req.query);
    
    try {
      if(typeof name !== 'string') throw new Error('name param must be of type string');

      const paginatedCourses = await courseService.findByName(name, page, perPage); 

      return res.json(paginatedCourses);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ message: err.message })
    }
  }
};