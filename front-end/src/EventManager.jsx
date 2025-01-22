import React, { useState, useEffect } from "react";
import { useNavigate,  useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {getAllGroups, getParticipantsFromEvent, getGroupsFromUserId, getGroupsFromGroupId, getEventsFromGroupEvent} from "./stores/API"
import * as XLSX from "xlsx";

export default function EventManager() {
    const navigate = useNavigate();
    const location = useLocation();
    const idUser = location.state?.idUser; 

    /*useEffect(() => {
        if (!idUser) {
            console.error('ID-ul utilizatorului nu a fost transmis.');
        }
    }, [idUser]);*/

    useEffect(() => {
        const loadGroups = async () => {
          const data = await getGroupsFromUserId(idUser);
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
            setEvents(Array.isArray(data) ? data : []);
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
        navigate("/createEvent", { state: { groupId , idUser} });
    };

    const goToCreateGroupEvent = () => {
        navigate("/createGroupEvent", {state: {idUser}});
    }

    // functie export csv
    const handleExportParticipantsToCsv = (participants) => {
        if (participants.length === 0) {
            alert("Nu există participanți pentru acest eveniment.");
            return;
        }
    
        // Crearea antetului și a datelor participanților
        const headers = ["Nume", "Moment alăturare"];
        const rows = participants.map((participant) => [participant.name, participant.joinMoment]);
    
        // Crearea conținutului CSV
        const csvContent = [
            headers.join(","), // Adăugăm antetul
            ...rows.map((row) => row.join(",")) // Adăugăm fiecare rând
        ].join("\n");
    
        // Crearea unui blob și descărcarea fișierului
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = `participanti_event_${selectedEvent?.name || "necunoscut"}.csv`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    //  functie export xlsx
    const handleExportParticipantsToXlsx = (participants) => {
        if (participants.length === 0) {
            alert("Nu există participanți pentru acest eveniment.");
            return;
        }
    
        // Crearea unui array de obiecte cu datele participanților
        const data = participants.map((participant) => ({
            Nume: participant.name,
            "Momentul intrării": participant.joinMoment,
        }));
    
        // Crearea unui workbook și a unui sheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Participanți");
    
        // Exportul către un fișier Excel
        XLSX.writeFile(workbook, `participanti_event_${selectedEvent?.name || "necunoscut"}.xlsx`);
    };
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
                        <p><strong>Data:</strong> {selectedEvent.date.split("T")[0]}</p>
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
                        <button className="btn" onClick={() => handleExportParticipantsToCsv(participants)}>Export CSV</button>
                        <button className="btn" onClick={() => handleExportParticipantsToXlsx(participants)}>Export XLSX</button>
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

