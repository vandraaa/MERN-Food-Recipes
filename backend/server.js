import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cors from 'cors';
import routes from './routes/web.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', routes);

app.listen(port, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${port}`);
})