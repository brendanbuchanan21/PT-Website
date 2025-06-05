import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase' // Adjust this path based on your project


//create the context container 
const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: {children: ReactNode}) {
    
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {

        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return unsuscribe;
    }, [])


    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}


