import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";


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
  }
};