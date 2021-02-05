import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './routes/taks.routes';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req, res) => {
    res.json({ message: 'welcome' });
})

app.use('/api/tasks', TasksRoutes);

export default app;