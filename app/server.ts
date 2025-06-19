import 'dotenv/config';
import express from 'express';

import { connectDatabase } from './database/db.js';
import adminRoutes from './routes/admin.js';
import authenticationRoutes from './routes/authentication.js';
import moderatorRoutes from './routes/moderator.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

connectDatabase();

app.use('/api/auth', authenticationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/moderator', moderatorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
