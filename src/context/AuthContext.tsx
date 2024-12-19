import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextType = {
    currentUser: User | null;
    loading: boolean;
};

const UserAuthContext = createContext<AuthContextType | null>(null);

export const UserAuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }
  
    return (
        <UserAuthContext.Provider value={{ currentUser, loading }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export function useUserAuth() {
    const context = useContext(UserAuthContext);

    if (!context) {
        throw new Error("useUserAuth must be used within a UserAuthContextProvider");
    }

    return context;
}
