import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt';
import { EpisodeInstance } from './Episode';


export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
};

export interface UserCreationAttributes extends Optional<User, 'id'> {};

export interface UserInstance extends Model<User, UserCreationAttributes>, User {
  Episodes?: Array<EpisodeInstance>;
  checkPassword: (password: string) => boolean;
};

export const userModel = sequelize.define<UserInstance, User>('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate:   {
      isIn: [['admin', 'user']]
    }
  }
}, {
  hooks: {
    beforeSave: async (user) => {
      if(user.isNewRecord || user.changed('password')) { // Se o registro é um registro novo ou se foi modificada a senha 
        user.password = await bcrypt.hash(user.password.toString(), 10)
      }
    }
  }
});



userModel.prototype.checkPassword = function(password: string) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    throw error;
  }
}