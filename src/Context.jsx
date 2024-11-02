import React, { createContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export const RoomContext = createContext();

function RoomProvider({ children }) {
  const [value, setValue] = useState("");
  const [isAuth, setAuth] = useState(!!localStorage.getItem("auth-token"));

  const LogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth-token");
      setAuth(false);
      setValue(""); // Reset any other relevant state
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  return (
    <RoomContext.Provider value={{ setValue, value, isAuth, setAuth, LogOut }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
