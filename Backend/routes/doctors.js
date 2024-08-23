import { Router } from 'express';
import Doctor from '../models/Doctor.js';  // Import default export only

const router = Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();  // Call find() on the Doctor model
        res.json(doctors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add new doctor
router.post('/add', async (req, res) => {
    const { name, specialty } = req.body;

    const newDoctor = new Doctor({ name, specialty });

    try {
        const savedDoctor = await newDoctor.save();
        res.json(savedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update doctor data
router.put('/update/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);  // Call findById() on the Doctor model
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        doctor.name = req.body.name || doctor.name;
        doctor.specialty = req.body.specialty || doctor.specialty;

        const updatedDoctor = await doctor.save();
        res.json({ message: 'Doctor updated!', doctor: updatedDoctor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete doctor by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);  // Call findByIdAndDelete() on the Doctor model
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
