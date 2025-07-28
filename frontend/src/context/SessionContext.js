'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { createSession, getAllSessions, getSession } from "@/services/sessionServices";
import { useAuthContext } from "./AuthContext";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { refreshUser } = useAuthContext();
  const [session, setSession] = useState({});
  const [allSessions, setAllSessions] = useState([]);
  const [sessionRefresh, setSessionRefresh] = useState(1);

  const generateSession = async () => {
    try {
      const response = await createSession();
      if (response.data.success) {
        alert(response.data.message);
        localStorage.setItem("sessionId", response.data.session._id);
        setSessionRefresh((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error creating session: ", err.message);
    }
  };

  // Fetch all sessions
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await getAllSessions();
        if (response.data.success) {
          setAllSessions(response.data.sessions);
        }
      } catch (err) {
        console.error("Error fetching sessions: ", err.message);
      }
    };
    fetchAll();
  }, [sessionRefresh]);

  // Fetch current session
  if (allSessions.length > 0) {
    useEffect(() => {
      const fetchOne = async () => {
        const sessionId = localStorage.getItem("sessionId");
        try {
          const response = await getSession(sessionId);
          if (response.data.success) {
            setSession(response.data.session);
          }
        } catch (err) {
          console.error("Error fetching session: ", err.message);
        }
      };
      fetchOne();
    }, [sessionRefresh, refreshUser]);
  }


  return (
    <SessionContext.Provider
      value={{
        session,
        allSessions,
        generateSession,
        setSessionRefresh,
        sessionRefresh,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
