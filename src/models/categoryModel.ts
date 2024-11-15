import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/config/sequelize';
import User from './userModel';

class Category extends Model<
  InferAttributes<Category, { omit: 'userId' }>,
  InferCreationAttributes<Category, { omit: 'userId' }>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare userId?: NonAttribute<User[]>;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, tableName: 'category' },
);

// Define the relationship to the User model
User.hasMany(Category, { foreignKey: 'userId', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'userId' });

export default Category;