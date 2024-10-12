import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/doctors`);
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${window.location.origin}/doctors/add`, newDoctor);
            setDoctors((prevDoctors) => [...prevDoctors, response.data]);
            setNewDoctor({ name: '', specialty: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const handleUpdateDoctor = async (e) => {
        e.preventDefault();
        if (!selectedDoctor) return;

        try {
            const response = await axios.put(`${window.location.origin}/doctors/update/${selectedDoctor._id}`, selectedDoctor);
            setDoctors((prevDoctors) =>
                prevDoctors.map((doctor) =>
                    doctor._id === selectedDoctor._id ? response.data : doctor
                )
            );
            setSelectedDoctor(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`${window.location.origin}/doctors/delete/${id}`);
            setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditMode(true);
    };

    return (
        <div className="main-doc-container">
            <div className="form-sections">
                <h4>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
                <form onSubmit={isEditMode ? handleUpdateDoctor : handleAddDoctor}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={isEditMode && selectedDoctor ? selectedDoctor.name : newDoctor.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (isEditMode && selectedDoctor) {
                                setSelectedDoctor((prev) => ({ ...prev, name: value }));
                            } else {
                                setNewDoctor((prev) => ({ ...prev, name: value }));
                            }
                        }}
                    />
                    <br />
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={isEditMode && selectedDoctor ? selectedDoctor.specialty : newDoctor.specialty}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (isEditMode && selectedDoctor) {
                                setSelectedDoctor((prev) => ({ ...prev, specialty: value }));
                            } else {
                                setNewDoctor((prev) => ({ ...prev, specialty: value }));
                            }
                        }}
                    />
                    <br />
                    <button type="submit">{isEditMode ? 'Update Doctor' : 'Add Doctor'}</button>
                </form>
            </div>
            <div className="doctors-section">
                <h3>Doctors ({doctors.length})</h3>
                <div className="doctor-list">
                    {doctors.map((doctor) => (
                        <DoctorCard
                            key={doctor._id} 
                            doctor={doctor}
                            onEdit={handleEditDoctor}
                            onDelete={handleDeleteDoctor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
