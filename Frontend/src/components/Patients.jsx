import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientCard from './PatientCard';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios.get('https://hospital-app-api.vercel.app/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    const handleAddPatient = (e) => {
        e.preventDefault();
        axios.post('https://hospital-app-api.vercel.app/patients/add', newPatient)
            .then(response => {
                setPatients([...patients, response.data]);
                setNewPatient({ name: '', age: '', gender: '' });
            })
            .catch(error => console.error('Error adding patient:', error));
    };

    const handleUpdatePatient = (id, e) => {
        e.preventDefault();
        axios.put(`https://hospital-app-api.vercel.app/patients/update/${id}`, selectedPatient)
            .then(response => {
                const updatedPatient = { ...selectedPatient, _id: id };
                setPatients(patients.map(
                    patient => patient._id === id ? updatedPatient : patient
                ));
                setSelectedPatient(null);
                setIsEditMode(false);
            })
            .catch(error => console.error('Error updating patient:', error));
    };

    const handleDeletePatient = (id) => {
        axios.delete(`https://hospital-app-api.vercel.app/patients/delete/${id}`)
            .then(response => {
                setPatients(patients.filter(patient => patient._id !== id));
            })
            .catch(error => console.error('Error deleting patient:', error));
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true);
    };

    return (
        <div className='patient-main'>
            <div className='form-sections'>
                <h4>
                    {isEditMode ? 'Edit Patient' : 'Add New Patient'}
                </h4>
                <form onSubmit={isEditMode ? (e) => handleUpdatePatient(selectedPatient._id, e) : handleAddPatient}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={isEditMode ? selectedPatient.name : newPatient.name}
                        onChange={(e) => isEditMode
                            ? setSelectedPatient({ ...selectedPatient, name: e.target.value })
                            : setNewPatient({ ...newPatient, name: e.target.value })}
                    />
                    <br />
                    <label htmlFor="age">Age: </label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={isEditMode ? selectedPatient.age : newPatient.age}
                        onChange={(e) => isEditMode
                            ? setSelectedPatient({ ...selectedPatient, age: e.target.value })
                            : setNewPatient({ ...newPatient, age: e.target.value })}
                    />
                    <br />
                    <label htmlFor="gender">Gender: </label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={isEditMode ? selectedPatient.gender : newPatient.gender}
                        onChange={(e) => isEditMode
                            ? setSelectedPatient({ ...selectedPatient, gender: e.target.value })
                            : setNewPatient({ ...newPatient, gender: e.target.value })}
                    />
                    <br />
                    <button type="submit">
                        {isEditMode ? 'Update Patient' : 'Add Patient'}
                    </button>
                </form>
            </div>

            <div className='patients-section'>
                <h3 style={{ textAlign: "center" }}>
                    Patients ({patients.length})
                </h3>
                <div className="patient-list">
                    {patients.map(patient => (
                        <PatientCard
                            key={patient._id}
                            patient={patient}
                            onEdit={handleEditPatient}
                            onDelete={handleDeletePatient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patients;
