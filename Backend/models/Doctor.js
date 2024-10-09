import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
   
}, {
    timestamps: true 
});

const Doctor = model('Doctor', doctorSchema);

export default Doctor;
