import { Request, Response } from "express";
import { courseService } from "../services/coursesService";
import { getPaginatedParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/jwtAuth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

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
  popular: async (req: Request, res: Response) => { // GET /courses/popular
    try {
      const topTen = await courseService.getTopTenByLikes();

      return res.status(200).json(topTen);        
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao buscar cursos mais populares" });      
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => { // GET /courses/:id
    const userId = req.user!.id;
    const { id } = req.params;

    try{
      const course = await courseService.findByIdWithEpisodes(id);

      if (!course) return res.status(404).json({ message: "Curso não encontrado" });

      const liked = await likeService.isLiked(userId, Number(id));
      const favorited = await favoriteService.isFavorited(userId, Number(id));

      return res.status(200).json({...course.get(), liked, favorited});
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