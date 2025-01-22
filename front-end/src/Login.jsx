import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();

        const inputUsername = document.getElementById("username").value;
        const inputPassword = document.getElementById("password").value;

        //fetch - metoda post => trimit username parola
        if (!inputUsername) {
            alert("Introduceți un username.");
            return;
        }
        if (!inputPassword) {
            alert("Introduceti o parola.");
            return;
        }
        try {
            // fetch request tip POST catre backend pt a trimite json cu datele utilizatorului
    
            const response = await fetch("http://localhost:8080/logUser", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputUsername, inputPassword }),
            });
      
            const data = await response.json();
            
            if(response.ok) {

                if(data && data.idUser) {

                    setMessage(`Log in successfull: ${data.username}`);
                    navigate("/eventManager", { state: { idUser: data.idUser } });
                    return;

                } else {

                    setMessage(data.error || 'Username or password invalid');
                    return;
                }
            } else {
                setMessage('A apărut o eroare la autentificare.');
                return;
            }
          } catch (error) {

            alert(`Eroare: ${error.message}`);
          }
    }
    const goToEventManager = () => {
        navigate("/eventManager")
    }
    return (
        <div className="login-container">
            <h2>Logare</h2>
            <form>
                <div className="containerLogin-username">
                    <label htmlFor="username">Utilizator:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="input" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="containerLogin-password">
                    <label htmlFor="password">Parola:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="input" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" className="btn" id="btnLogin" onClick={handleLogIn}>Log in</button>
            </form>
            {message && <p className="message">{message}</p>} {/* Mesaj feedback */}
        </div>
    );
}