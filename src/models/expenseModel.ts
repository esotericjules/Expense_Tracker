import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config/sequelize';
import User from './userModel';
import Category from './categoryModel';

class Expense extends Model {}

Expense.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, tableName: 'expense' },
);

// Define relationships to User and Category models
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

export default Expense;
