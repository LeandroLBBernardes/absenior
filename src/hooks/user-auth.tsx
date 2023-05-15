import { createContext, useState, useContext } from "react";

const AuthContext: any = createContext({});

export function AuthContextProvider({children}: any) {
    const [user, setUser] = useState();

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): any {
    return(useContext(AuthContext));
}