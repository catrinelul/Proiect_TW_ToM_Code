import React from "react";

export default function CreateEvent() {
    return (
        <div className="create-event">
            <h2>Creare Eveniment</h2>
            <form className="event-form">
                <div className="form-group">
                    <label htmlFor="eventName">Nume Eveniment:</label>
                    <input
                        type="text"
                        id="eventName"
                        placeholder="Introdu numele evenimentului"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Data:</label>
                    <input
                        type="date"
                        id="eventDate"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Timp Începere:</label>
                    <input
                        type="time"
                        id="startTime"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">Timp Încheiere:</label>
                    <input
                        type="time"
                        id="endTime"
                    />
                </div>
                <button type="submit" className="btn btn-submit">
                    Creează Eveniment
                </button>
            </form>
        </div>
    );
}