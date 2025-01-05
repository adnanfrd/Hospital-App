import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import patientsRouter from './routes/patients.js';
import doctorsRouter from './routes/doctors.js';
import appointmentsRouter from './routes/appointments.js';

const DB_URL='mongodb+srv://adnan:adnan%40786A@cluster0.vx12t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors())
app.use(express.json());
mongoose.connect(DB_URL)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));
app.get('/', (req, res) => {
    res.json("hello");
})
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
