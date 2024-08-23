import React from 'react';

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
    const handleEdit = () => onEdit(appointment);
    const handleDelete = () => onDelete(appointment._id);

    return (
        <div className="appointment-card">
            <p>
                <span>Patient:</span> {appointment.patientName}
            </p>
            <p>
                <span>Doctor:</span> {appointment.doctorName}
            </p>
            <p>
                <span>Date:</span> {new Date(appointment.date).toLocaleDateString()}
            </p>
            <div className="btn-container">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;
