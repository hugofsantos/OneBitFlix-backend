import { DataTypes, Model, Optional } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";
import { sequelize } from "../database";

export interface Favorite {
  id: number;
  userId: number;
  courseId: number;
}

export interface FavoriteCreationAttributes extends Optional<Favorite, 'id'> {};

export interface FavoriteInstance extends Model<Favorite, FavoriteCreationAttributes>, Favorite {
  Course?: CourseInstance;
  User?: UserInstance
};

export const favoriteModel = sequelize.define<FavoriteInstance, Favorite>('Favorite', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER    
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {model: 'users', key: 'id'},
    onUpdate:'CASCADE',
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

