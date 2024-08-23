import { Router } from 'express';
import Appointment from '../models/Appointment.js'; // Import the default export

const router = Router();

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find(); // Call find() directly on the Appointment model
        res.json(appointments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new appointment
router.post('/add', async (req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment = new Appointment({ patientName, doctorName, date });

    try {
        const savedAppointment = await newAppointment.save();
        res.json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update appointment data
router.put('/update/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id); // Call findById() directly on the Appointment model
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.patientName = req.body.patientName || appointment.patientName;
        appointment.doctorName = req.body.doctorName || appointment.doctorName;
        appointment.date = req.body.date || appointment.date;

        const updatedAppointment = await appointment.save();
        res.json({ message: 'Appointment updated!', appointment: updatedAppointment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id); // Call findByIdAndDelete() directly on the Appointment model
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
