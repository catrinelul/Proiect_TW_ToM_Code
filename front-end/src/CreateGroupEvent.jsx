import React from "react";

export default function CreateEventGroup() {
    
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
                <button type="submit" className="btn btn-submit">
                    Creează Grup
                </button>
            </form>
        </div>
    );
}