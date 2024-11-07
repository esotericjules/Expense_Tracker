import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
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
User.hasMany(Expense, { foreignKey: 'id', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Expense, { foreignKey: 'id', onDelete: 'SET NULL' });
Expense.belongsTo(Category, { foreignKey: 'category_id' });

export default Expense;
