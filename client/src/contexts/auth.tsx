import React, { createContext, useEffect, useState } from 'react';

interface IUser {
    id: string;
    email: string;
    token: string
}

interface AuthContextData {
    currentUser: IUser | null;
    signed: boolean;
    login(email: string, password: string): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ user, children}: {user: any; children: any}) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        if(user){
            setCurrentUser(JSON.parse(user));
            setSigned(true);
        }
    }, [user]);

    async function login(email: string, password: string): Promise<void>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        };

        fetch('/auth/login', requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
            const {userId, token} = result;

            const data = {
                id: userId,
                email,
                token
            }

            localStorage.setItem('userInfo', JSON.stringify(data));

            setCurrentUser(data);
            setSigned(true);
        });
    }

    function logout(){
        localStorage.removeItem('userInfo');

        setCurrentUser({});
        setSigned(false);
    }

    return(
        <AuthContext.Provider value={{currentUser, signed, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);