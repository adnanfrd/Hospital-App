import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import patientsRouter from './routes/patients.js';
import doctorsRouter from './routes/doctors.js';
import appointmentsRouter from './routes/appointments.js';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());

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
