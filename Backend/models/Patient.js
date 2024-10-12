import { Schema, model } from 'mongoose';

const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    
}, {
    timestamps: true 
});

const Patient = model('Patient', patientSchema);

export default Patient;
