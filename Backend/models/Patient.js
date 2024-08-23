import { Schema, model } from 'mongoose';

const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    // Add more fields as needed
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Patient = model('Patient', patientSchema);

export default Patient;
