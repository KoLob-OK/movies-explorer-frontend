import React, {createContext, useEffect, useState} from "react";
export const UserContext = createContext({name: 'Василий'});

export const UserContextProvider = ({setIsLoading, children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setIsLoading(true)
        fetch('', {}).then((user) => {
            if(user) {
                setUser(user)
            }
        });
        setIsLoading(false)
    });

    return (
        <UserContext.Provider value={{name: "Василий"}}>
            {children}
        </UserContext.Provider>
    )
}
