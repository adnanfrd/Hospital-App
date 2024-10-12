import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import patientsRouter from './routes/patients.js';
import doctorsRouter from './routes/doctors.js';
import appointmentsRouter from './routes/appointments.js';

const app = express();
const PORT = process.env.PORT || 6000;

const allowedOrigins = [
    'http://localhost:5174', 
    'https://hospital-kmkm4onlh-muhammad-adnan-fareeds-projects-b9c0d141.vercel.app' 
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, origin); 
        } else {
            callback(new Error('Not allowed by CORS')); 
        }
    }
}));


app.use(express.json());

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('MongoDB database connection established successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
