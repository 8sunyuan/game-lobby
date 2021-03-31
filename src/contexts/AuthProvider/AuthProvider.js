import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase";

export const Context = createContext();

export default function AuthProvider({ children }) {
  const [state, setState] = useState({init: false, user: null});
  
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User", user);
      
      if (!state.init) {
        setState({init: true, user: user});
      } else {
        setState({...state, user: user});
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
}
