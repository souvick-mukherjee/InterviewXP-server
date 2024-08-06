import express, {Application} from 'express';
import userRouter from './routes/user';
import { connectMongoDB } from './connections';
import userRoute from './routes/user';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port:number = parseInt(process.env.PORT as string, 10) || 3000;

connectMongoDB(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');

    app.use(express.json());
    app.use('/api/user', userRoute);
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
})

