
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function CreateEvent() {
    const location = useLocation();
    const navigate = useNavigate();
    const groupId = location.state?.groupId; // Obține ID-ul grupului
    const idUser = location.state?.idUser;

    const [eventData, setEventData] = useState({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        isOpened: "",
        groupId: groupId
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // extrage 'name' și 'value' din elementul care a declanșat evenimentul
        setEventData((prev) => ({ 
            ...prev, //  copiază toate valorile existente din obiectul anterior
            [name]: value // actualizează cheia corespunzătoare 'name' cu noua valoare 'value'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // previne trimiterea formularului și reîncărcarea paginii

        eventData.name= document.getElementById("eventName").value;
        eventData.date = document.getElementById("eventDate").value;
        eventData.startTime = document.getElementById("startTime").value;
        eventData.endTime= document.getElementById("endTime").value;
        try {
            const response = await fetch("http://localhost:8080/event", {
                method: 'post',
                body: JSON.stringify(eventData),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            navigate("/eventManager",{state: {idUser}}); // Redirecționează utilizatorul înapoi
            return await response.json();
        } catch (error) {
            console.warn(error);
        }
    };
    


    return (
        <div className="create-event">
            <h2>Creare Eveniment</h2>
            <h4> Grup asociat: {groupId}</h4>
            <form className="event-form" >
                <div className="form-group">
                    <label htmlFor="eventName">Nume Eveniment:</label>
                    <input
                        type="text"
                        id="eventName"
                        placeholder="Introdu numele evenimentului"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Data:</label>
                    <input
                        type="text"
                        id="eventDate"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Timp Începere:</label>
                    <input
                        type="text"
                        id="startTime"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">Timp Încheiere:</label>
                    <input
                        type="text"
                        id="endTime"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-submit" onClick={handleSubmit}>
                    Creează Eveniment
                </button>
            </form>
        </div>
    );
}