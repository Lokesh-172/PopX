import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';   
import { auth } from '../utils/firebase';

const AuthContext = React.createContext();

export const useAuth = () => { 
    return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentuser, setCurrentUser] = useState(null); 
    const[userLoggedIn, setUserLoggedIn] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , initializeUser)
        return unsubscribe
    }, []);

    async function initializeUser(user) {
        setCurrentUser(user);
        if (user) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentuser,
        userLoggedIn,
        loading,
    };

    return <AuthContext.Provider value={value}>{!loading &&children}</AuthContext.Provider>;
}


