import React, { useContext, useEffect, useState } from 'react';
import { HandleError } from '../Utils';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { RoomContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import { orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Chat() {
    const navigate =useNavigate()
    const { LogOut, value } = useContext(RoomContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const messageQuery = query(messageRef, where("room", "==", value), orderBy("createdAt"));
        const unsubscribe = onSnapshot(messageQuery, (snap) => {
            let messagesArray = [];
            snap.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messagesArray);
            setLoading(false); // Stop loading after messages are fetched
        });
        return () => unsubscribe();
    }, [value]);

    const HandleSubmit = async (event) => {
        event.preventDefault();
        if (message === "") {
            HandleError("Please enter something!");
            return;
        }

        try {
            await addDoc(messageRef, {
                text: message,
                createdAt: Date.now(),
                user: auth.currentUser.displayName,
                room: value
            });
            setMessage("");
            toast.success("Message sent!"); // Notify user on success
        } catch (error) {
            HandleError(error.message || "Failed to send message.");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <div className="chat-header p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Chat Room: {value}</h5>
                <button className="btn btn-danger" onClick={LogOut}>Logout</button>
                <button  onClick={()=>{navigate("/input")}}  className="btn-primary btn">Go Back</button>
            </div>
            <div className="chat-messages flex-grow-1 overflow-auto p-3">
                {loading ? (
                    <div>Loading messages...</div> // Loading indicator
                ) : (
                    <ul className="list-unstyled">
                        {messages.map((msg) => (
                            <li key={msg.id} className="mb-2">
                                <div className="p-2 bg-light rounded">
                                    <strong>{msg.user}:</strong> {msg.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <form onSubmit={HandleSubmit} className="p-3 border-top bg-light">
                <div className="input-group">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-success">Send</button>
                </div>
            </form>
            <ToastContainer /> {/* Toast container for notifications */}
        </div>
    );
}

export default Chat;
