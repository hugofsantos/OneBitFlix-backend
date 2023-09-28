import { Response } from "express";
import { createReadStream, statSync } from "fs";
import path from "path";

export const episodeService = {
  streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
    const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl);
    const fileStat = statSync(filePath);


    if (range) {
      const parts = range.replace(/bytes=/, '').split('-'); // O range vem no formato byte=<byteInicio>-<byteFim>

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1; // Se o final não estiver definido, considera como todo o vídeo (-1 pois começa em 0)

      const chunkSize = (end - start) + 1; // Tamanho do pedaço (+1 para compensar o -1 anterior)

      const file = createReadStream(filePath, { start, end });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      }

      res.writeHead(206, head); // Status 206 = Conteúdo parcial
      file.pipe(res); // A response do express é uma Stream
    }
    else {
      const head = {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4'
      };

      res.writeHead(200, head); // Status 206 = Conteúdo parcial
      createReadStream(filePath).pipe(res);
    }      
  }
};