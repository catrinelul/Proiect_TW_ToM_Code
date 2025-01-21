import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const goToLogin = () => {
            navigate("/login");
    }
    const handleParticipantAccess = () => {
        //preluez din input codul
        const eventCode = document.getElementById("inputEventCode").value;
        const nameParticipant = document.getElementById("inputName").value;
    
        if (!eventCode) {
          alert("Introduceți un cod valid pentru eveniment.");
          return;
        }
        if (!nameParticipant) {
          alert("Introduceti un nume valid pentru a intra in eveniment");
          return;
        }
        try {
          // facem fetch la bd 
          // cautam evenimentul care are id_eveniment = eventCode
    
          //adaugam participantul in bd
        } catch (error) {
          alert(`Eroare: ${error.message}`);
        }
    };

    return (
        <div className="app">
            <div className="bar">
                <button id="btnLogIn" className="btn" onClick={goToLogin}>
                    Log in
                </button>
                <button id="btnRegister" className="btn">
                    Register
                </button>
            </div>
            <div className="container">
                <h1>Here!</h1>
                <br />
                <input type="number" id="inputEventCode" placeholder="Enter code" className="input"></input>
                <input type="text" id="inputName" placeholder="Enter name" className="input"></input>
                <button id="btnJoinEvent" className="btn">Join</button>
                <br />
            </div>
        </div>
    );
}