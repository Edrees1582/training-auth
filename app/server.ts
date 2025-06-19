import 'dotenv/config';
import express from 'express';

import adminRoutes from './routes/admin.js';
import authenticationRoutes from './routes/authentication.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use('/api/auth', authenticationRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
