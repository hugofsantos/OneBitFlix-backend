import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface WatchTime {
  id: number;
  seconds: number;
  userId: number;
  episodeId: number;
}

export interface WatchTimeCreationAttributes extends Optional<WatchTime, "id"> {}

export interface WatchTimeInstance extends Model<WatchTime, WatchTimeCreationAttributes>, WatchTime {}

export const watchTimeModel = sequelize.define<WatchTimeInstance, WatchTime>('WatchTime', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  episodeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'episodes', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
});