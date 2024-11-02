import React, { useContext, useState } from 'react';
import { RoomContext } from '../Context';
import { useNavigate } from 'react-router-dom';

function Room() {
    const navigate=useNavigate()
    const [roomName, setRoomName] = useState("");
const{setValue, value, LogOut}=useContext(RoomContext)
    const handleSubmit = (e) => {
        e.preventDefault();
       
            setValue(roomName);
            console.log(value);
            setTimeout(() => {
                navigate("/chat")
            }, 1000);

    };

    return (
        <div className="container d-flex justify-content-center mt-5" style={{ height: "100vh" }}>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="roomName">Enter Room Name</label>
                    <input
                        type="text"
                        id="roomName"
                        className="form-control"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success mt-2">
                       
                        Enter Chat
                    </button>
                    <button className='btn btn-danger mt-2' onClick={()=>LogOut()}>Logout</button>
                </form>
            </div>
        </div>
    );
}

export default Room;
