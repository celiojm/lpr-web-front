import React, {createContext, useState, useEffect} from 'react';
import Services from '../Services';

export const AuthContext = createContext();

export default ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // eslint-disable-next-line
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() =>{
        Services.AuthService.isAuthenticated()
            .then(data =>{
                setUser(data.user);
                setIsAuthenticated(data.isAuthenticated);
                setIsLoaded(true);
            })
    },[]);

    return (
        <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>);
}