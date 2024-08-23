import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
    // Add more fields as needed
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
