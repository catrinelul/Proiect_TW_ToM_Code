import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [userData, setEventData] = useState({
            username: "",
            password: "",
        });

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username) {
            alert("Introduceți un username.");
            return;
        }
        if (!password) {
            alert("Introduceți o parolă.");
            return;
        }

        try {
            userData.username = document.getElementById("username").value;
            userData.password = document.getElementById("password").value;

            // Trimitere datelor către backend
            const response = await fetch("http://localhost:8080/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Înregistrare reușită! Redirecționare către pagina de logare...");
                setTimeout(() => {
                    navigate("/login"); // Redirecționare către pagina de logare
                }, 2000);
            } else {
                setMessage(data.error || "A apărut o eroare la înregistrare.");
            }
        } catch (error) {
            setMessage(`Eroare: ${error.message}`);
        }
    };

    return (
        <div className="register-container">
            <h2>Înregistrare</h2>
            <form onSubmit={handleRegister}>
                <div className="containerRegister-username">
                    <label htmlFor="username">Utilizator:</label>
                    <input
                        type="text"
                        id="username"
                        className="input"
                        placeholder="Introduceți username-ul"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="containerRegister-password">
                    <label htmlFor="password">Parolă:</label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder="Introduceți parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn" id="btnRegister">
                    Înregistrează-te
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}