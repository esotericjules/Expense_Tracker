import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './userModel';

class Category extends Model {}

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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, tableName: 'category' },
);

// Define the relationship to the User model
User.hasMany(Category, { foreignKey: 'id', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'user_id' });

export default Category;
