import e from "express";
import { userModel } from "../models";
import { UserCreationAttributes } from "../models/User";
import { EpisodeInstance } from "../models/Episode";

function filterLastEpisodesByCourse(episodes: Array<EpisodeInstance>) {
  const coursesIdsOnList: Array<number> = [];

  const lastEpisodes = episodes.reduce((currentList: EpisodeInstance[], episode: EpisodeInstance) => {
    if(!coursesIdsOnList.includes(episode.courseId)) {
      coursesIdsOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);

    if(episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId != episode.courseId);
    listWithoutEpisodeFromSameCourse.push(episode);
    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const userService = {
  async findByEmail(email: string) {
    try {
      const user = await userModel.findOne({
        where: {email}
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  async create(attributes: UserCreationAttributes) {
    try {
      const user = await userModel.create(attributes);

      return user;
    } catch (error) {
      throw error;  
    }
  },

  async getKeepWatching(id: number) {
    try {
      const userWithWatchingEpisodes = await userModel.findByPk(id, {
        include: {
          attributes: [
            'id', 
            'name', 
            'synopsis', 
            'order',
            ['video_url', 'videoUrl'],
            ['seconds_long', 'secondsLong'],
            ['course_id', 'courseId']
          ],
          association: 'Episodes',
          include: [
            {association: 'Course', attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']]} 
          ],
          through: {
            as: 'watchTime',
            attributes: [
              'seconds',
              ['updated_at', 'updatedAt']
            ]
          },
          
        }
      });

      if(!userWithWatchingEpisodes) throw new Error('Usuário não encontrado');

      const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!);

      return keepWatchingList;
    } catch (error) {
      throw e;
    }
  }
};