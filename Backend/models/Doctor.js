import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    // Add more fields as needed
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Doctor = model('Doctor', doctorSchema);

export default Doctor;
