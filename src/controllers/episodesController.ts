import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/jwtAuth";

export const EpisodesController = {
  // GET /episodes/stream
  stream: async (req: Request, res: Response) => {
    const {videoUrl} = req.query;

    try {
      if(typeof videoUrl !== 'string')
        throw new Error('videoUrl param must be of type string!');

      const { range } = req.headers; // Qual parte do recurso (video) está sendo solicitado

      episodeService.streamEpisodeToResponse(res, videoUrl, range);

    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ message: err.message })      
    }
  },
  // GET /episodes/:id/watchTime
  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = Number(req.user!.id);
      const episodeId = Number(req.params.id);

      const watchTime = await episodeService.getWatchTime(userId, episodeId);

      return res.status(200).json(watchTime);
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao buscar tempo assistido do episódio" });
    }
  },

  // POST /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = Number(req.user!.id);
      const episodeId = Number(req.params.id);
      const { seconds } = req.body;

      const watchTime = await episodeService.setWatchTime({userId, episodeId, seconds});

      return res.status(200).json(watchTime);
    } catch (error) {
      return res.status(500).json({ message: (error as any).message ?? "Ocorreu algum erro ao buscar tempo assistido do episódio" });
    }
  }  
};