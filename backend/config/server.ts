import 'dotenv/config';
import express from 'express';
import router from '../routes/index.ts';
import sequelize from './database.ts';
import '../components/url/models/url.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

startServer();
