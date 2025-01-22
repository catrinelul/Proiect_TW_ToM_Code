import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateEventGroup() {
    const location = useLocation();
    const navigate = useNavigate();
    const idUser = location.state?.idUser; // Obține ID-ul utilizatorului

    const [groupData, setGroupData] = useState({
        name:"",
        userId: idUser
    })

    //fetch - add new group
    const handleSubmit = async (e) => {
        e.preventDefault(); // previne trimiterea formularului și reîncărcarea paginii

        groupData.name = document.getElementById("groupName").value;
        
        try {
            const response = await fetch("http://localhost:8080/group", {
                method: 'post',
                body: JSON.stringify(groupData),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            navigate("/eventManager", {state: {idUser}}); // Redirecționează utilizatorul înapoi
            return await response.json();
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <div className="create-event-group">
            <h2>Creare Grup de Evenimente</h2>
            <form className="group-form">
                <div className="form-group">
                    <label htmlFor="groupName">Nume Grup:</label>
                    <input
                        type="text"
                        id="groupName"
                        placeholder="Introdu numele grupului"
                    />
                </div>
                <button type="submit" className="btn btn-submit" onClick={handleSubmit}>
                    Creează Grup
                </button>
            </form>
        </div>
    );
}