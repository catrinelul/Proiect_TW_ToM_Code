import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export default function EventManager() {
    const navigate = useNavigate();
    const goToCreateEvent = () => {
        navigate("/createEvent")
    }
    const goToCreateGroupEvent = () => {
        navigate("/createGroupEvent")
    }
    // date pentru testare
    const mockEvents = [
        {
            id: 1,
            name: "Curs Multimedia",
            type:"group",
            events: [
                {
                    id: 3256,
                    name: "Sub-eveniment 1",
                    date: "2025-01-22",
                    startTime: "13:30",
                    endTime: "15:00",
                    status: "CLOSED",
                    type: "event",
                    participants: [
                        { name: "George Vasilescu", accessDate: "2025-01-18 14:00" },
                    ],
                },
                {
                    id: 4857,
                    name: "Sub-eveniment 2",
                    date: "2025-01-23",
                    startTime: "12:00",
                    endTime: "14:00",
                    status: "OPEN",
                    type: "event",
                    participants: [],
                },
            ],
        },
        {
            id: 7,
            name: "Curs TW",
            type:"group",
            events: [
                {
                    id: 3799,
                    name: "Sub-eveniment 1",
                    date: "2025-01-22",
                    startTime: "13:30",
                    endTime: "15:00",
                    status: "CLOSED",
                    type: "event",
                    participants: [
                        { name: "George Vasilescu", accessDate: "2025-01-18 14:00" },
                    ],
                },
                {
                    id: 737,
                    name: "Sub-eveniment 2",
                    date: "2025-01-23",
                    startTime: "12:00",
                    endTime: "14:00",
                    status: "OPEN",
                    type: "event",
                    participants: [],
                },
            ],
        },
        {
            id: 5,
            name: "Curs Android",
            type:"group",
            events: [
                {
                    id: 739,
                    name: "Sub-eveniment 1",
                    date: "2025-01-22",
                    startTime: "13:30",
                    endTime: "15:00",
                    status: "CLOSED",
                    type: "event",
                    participants: [
                        { name: "George Vasilescu", accessDate: "2025-01-18 14:00" },
                    ],
                },
                {
                    id: 1728,
                    name: "Sub-eveniment 2",
                    date: "2025-01-23",
                    startTime: "12:00",
                    endTime: "14:00",
                    status: "OPEN",
                    type: "event",
                    participants: [],
                },
            ],
        },
    ];

    const [events, setEvents] = useState(mockEvents); // Lista de evenimente
    const [selectedEvent, setSelectedEvent] = useState(null); // Evenimentul selectat
    const [selectedGroup, setSelectedGroup] = useState(null); // Grupul selectat
    const [isModalOpen, setIsModalOpen] = useState(false); // Verifica cand deschidem fereastra cu codul de acces
    const [accessCode, setAccessCode] = useState(""); // pentru a seta codul de acces
    const [eventId, setEventId] = useState("");

    const handleViewEvent = (event) => {
        setSelectedEvent(event);
        setSelectedGroup(null);
    };

    const handleViewGroup = (group) => {
        setSelectedGroup(group);
        setSelectedEvent(null);
    };

    const handleShowAccessCode = (code, id) => {
        setAccessCode(code); // Codul accesului
        setEventId(id); // ID-ul evenimentului
        setIsModalOpen(true); // Deschide modalul
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Închide modalul
    };
    return (
        <div className="event-manager">
            <div className="sidebar">
                <h2>Evenimente</h2>
                <button className="btn" id="btnCreareGrupEvent" onClick={goToCreateGroupEvent}>Creare grup de evenimente</button>
                <div className="event-list">
                    {events.length === 0 ? (
                        <p>Nu există evenimente create.</p>
                    ) : (
                        events.map((item) => (
                            <div key={item.id} className="event-item">
                                <span>
                                    {item.name}
                                </span>
                                {item.type === "group" ? (
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleViewGroup(item)}
                                    >
                                        Vezi grup
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleViewEvent(item)}
                                    >
                                        Detalii
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="details">
                {selectedEvent ? (
                    <div>
                        <h2>Detalii eveniment</h2>
                        <p><strong>Nume:</strong> {selectedEvent.name}</p>
                        <p><strong>Data:</strong> {selectedEvent.date}</p>
                        <p><strong>Timp incepere:</strong> {selectedEvent.startTime}</p>
                        <p><strong>Timp incheiere:</strong> {selectedEvent.endTime}</p>
                        <p><strong>Status:</strong> {selectedEvent.status}</p>
                        <h3>Participanți:</h3>
                        <ul>
                            {selectedEvent.participants.map((p, index) => (
                                <li key={index}>
                                    {p.name} - {p.accessDate}
                                </li>
                            ))}
                        </ul>
                        <button className="btn" onClick={() => alert("Export CSV")}>Export CSV</button>
                        <button className="btn" onClick={() => alert("Export XLSX")}>Export XLSX</button>
                    </div>
                ) : selectedGroup  ? (
                    <div>
                        <h2>Grup de evenimente: {selectedGroup.name}</h2>
                        <button className="btn" id="btnCreareEvent" onClick={goToCreateEvent}>Adauga eveniment in grup</button>
                        <ul>
                            {selectedGroup.events.map((event) => (
                                <li key={event.id}>
                                    {event.name} - {event.date}
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleViewEvent(event)}
                                    >
                                        Detalii
                                    </button>
                                    <button
                                    className="btn btn-small btn-code"
                                    onClick={() => handleShowAccessCode(event.id)}
                                    >
                                    Cod de acces
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Selectați un eveniment sau un grup pentru a vedea detaliile.</p>
                )}
            </div>
            <div className="event-access">
                {isModalOpen && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Access Code</h3>
                            <p>{accessCode}</p>
                            <QRCodeSVG value={eventId} size={150} level="H" />
                            <button className="btn" id="btnCloseModal" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
            )}
            <div/>
        </div>
        </div>
    );
}