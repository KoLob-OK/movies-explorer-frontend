import React, { createContext, useEffect, useState } from 'react';
export const CurrentUserContext = createContext({});

export const CurrentUserContextProvider = ({ setIsLoading, children }) => {
    // Текущий пользователь
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setIsLoading(true)
        fetch('', {}).then((user) => {
            if(user) {
                setCurrentUser(user)
            }
        });
        setIsLoading(false)
    });

    return (
        <CurrentUserContext.Provider value={currentUser}>
            {children}
        </CurrentUserContext.Provider>
    )
}
