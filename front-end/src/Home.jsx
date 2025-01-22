import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const goToLogin = () => {
            navigate("/login");
    }
    const goToRegister = () => {
      navigate("/register");
}
    const handleParticipantAccess = async () => {
      //preluez din input codul
      const inputEventId = document.getElementById("inputEventCode").value;
      const inputName = document.getElementById("inputName").value;
  
      if (!inputEventId) {
        alert("Introduceți un cod valid pentru eveniment.");
        return;
      }
      if (!inputName) {
        alert("Introduceti un nume valid pentru a intra in eveniment");
        return;
      }
      try {
        // fetch request tip POST catre backend pt a trimite json cu noul participant

        const response = await fetch("http://localhost:8080/participant", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputName, inputEventId }),
        });
  
        const data = await response.json();

        if (response.ok) {
          setMessage(`Sunteti prezent la eveniment!`);
        } else {
          setMessage(data.error || 'An error occurred');
        }
  

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
                <button id="btnRegister" className="btn" onClick={goToRegister}>
                    Register
                </button>
            </div>
            <div className="container">
                <h1>Here!</h1>
                <br />
                <input type="number" id="inputEventCode" placeholder="Enter code" className="input"></input>
                <input type="text" id="inputName" placeholder="Enter name" className="input"></input>
                <button id="btnJoinEvent" className="btn" onClick={handleParticipantAccess}>Join</button>
                <br />
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}