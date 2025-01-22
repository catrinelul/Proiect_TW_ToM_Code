import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {getAllGroups, getParticipantsFromEvent, getGroupsFromUserId, getGroupsFromGroupId, getEventsFromGroupEvent} from "./stores/API"

export default function EventManager() {
    const navigate = useNavigate();

    useEffect(() => {
        const loadGroups = async () => {
          const data = await getAllGroups();
          setGroups(data);
        };
        loadGroups();
    }, []);
    
    

    const [groups, setGroups] = useState([]); // Lista grupurilor
    const [events, setEvents] = useState([]); // Lista evenimentelor
    const [participants, setParticipants] = useState([]); // Lista participanti
    const [selectedEvent, setSelectedEvent] = useState(null); // Evenimentul selectat
    const [selectedGroup, setSelectedGroup] = useState(null); // Grupul selectat
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal
    const [accessCode, setAccessCode] = useState(""); // Codul de acces
    const [eventId, setEventId] = useState("");

    const handleViewEvent = (event) => {
        setSelectedEvent(event);
        const loadEventDetails = async () => {
            const data = await getParticipantsFromEvent(event.idEvent);
            setParticipants(data);
        };
        loadEventDetails();
        setSelectedGroup(null);
    };
    
    const handleViewGroup = (group) => {
        setSelectedGroup(group);
        const loadEvents = async () => {
            const data = await getEventsFromGroupEvent(group.idGroup);
            setEvents(data);
        };
        loadEvents();
        setSelectedEvent(null);
    };

    const handleShowAccessCode = (event) => {
        setAccessCode(event.idEvent); // Codul accesului
        setEventId(event.idEvent); // ID-ul evenimentului
        setIsModalOpen(true); // Deschide modalul
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Închide modalul
    };
    
    const goToCreateEvent = (groupId) => {
        navigate("/createEvent", { state: { groupId } });
    };

    const goToCreateGroupEvent = () => {
        navigate("/createGroupEvent")
    }

    // functie export csv

    //  functie export xlsx

    return (
        <div className="event-manager">
            <div className="sidebar">
                <h2>Grupuri de evenimente</h2>
                <button className="btn" id="btnCreareGrupEvent" onClick={goToCreateGroupEvent}>Creare grup de evenimente</button>
                <div className="group-list">
                    {groups.length === 0 ? (
                        <p>Nu există evenimente create.</p>
                    ) : (
                        groups.map((item) => (
                            <React.Fragment key={item.idGroup}>
                            <div className="group-item">
                                <span>
                                    {item.name}
                                </span>
                                    <button
                                        id="btnVeziGroup"
                                        className="btn btn-small"
                                        onClick={() => handleViewGroup(item)}
                                    >
                                        Vezi grup
                                    </button>
                            </div>
                            </React.Fragment>
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
                        <p><strong>Status:</strong> {selectedEvent.isOpened?"OPEN":"CLOSED"}</p>
                        <h3>Participanți:</h3>
                        {participants.length === 0 ? (
                            <p>Nu există participanti</p>
                        ) : (
                            <ul>
                                {participants.map((item) => (
                                    <li key={item.idParticipant}>
                                        {item.name} - {item.joinMoment}
                                    </li>
                                ))}
                            </ul> )
                        }
                        <button className="btn" onClick={() => alert("Export CSV")}>Export CSV</button>
                        <button className="btn" onClick={() => alert("Export XLSX")}>Export XLSX</button>
                    </div>
                ) : selectedGroup  ? (
                    <div>
                        <h2>Grup de evenimente: {selectedGroup.name}</h2>
                        <button className="btn" id="btnCreareEvent" onClick = {() => goToCreateEvent(selectedGroup.idGroup)}>Adauga eveniment in grup</button>
                        <ul>
                            {events.map((event) => (
                                <React.Fragment key={event.idEvent}>
                                <li>
                                    {event.name} - {event.date.split("T")[0]}
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleViewEvent(event)}
                                    >
                                        Detalii
                                    </button>
                                    <button
                                    className="btn btn-small btn-code"
                                    onClick={() => handleShowAccessCode(event)}
                                    >
                                    Cod de acces
                                    </button>
                                </li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Selectați un grup pentru a vedea detaliile.</p>
                )}
            </div>
            <div className="event-access">
                {isModalOpen && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Access Code</h3>
                            <p>{eventId}</p>
                            <QRCodeSVG value={accessCode} size={200} level="H" />
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

