import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const goToEventManager = () => {
        // verificare daca username, password sunt valide
        navigate("/eventManager")
    }
    return (
        <div className="login-container">
            <h2>Logare</h2>
            <form>
                <div className="containerLogin-username">
                    <label htmlFor="username">Utilizator:</label>
                    <input type="text" id="username" className="input" placeholder="Enter username" required />
                </div>
                <div className="containerLogin-password">
                    <label htmlFor="password">Parola:</label>
                    <input type="password" id="password" className="input" placeholder="Enter password" required />
                </div>
                <button type="submit" className="btn" id="btnLogin" onClick={goToEventManager}>Log in</button>
            </form>
        </div>
    );
}