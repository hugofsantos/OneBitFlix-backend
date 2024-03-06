import { DataTypes, Model, Optional } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";
import { sequelize } from "../database";

export interface Like {
  id: number;
  userId: number;
  courseId: number;
};

export interface LikeCreationAttributes extends Optional<Like, 'id'> {};

export interface LikeInstance extends Model<Like, LikeCreationAttributes>, Like {
  Course?: CourseInstance;
  User?: UserInstance;
}

export const LikeModel = sequelize.define<LikeInstance, Like>('Like', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

