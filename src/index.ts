import express, { Express } from 'express';
import dotenv from 'dotenv';
import { testDbConnection } from './database/config/db';
import userRoutes from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';
import categoryRoutes from './routes/categoryRoutes';
import reportRoutes from './routes/reportRoutes';
dotenv.config();

// Initialize the Express app
const app: Express = express();

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

const routes = [userRoutes, categoryRoutes, expenseRoutes, reportRoutes];
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await testDbConnection();
});
