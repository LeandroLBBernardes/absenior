import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '../services/supabase/supabase';

const AuthContext = createContext<{ session: Session | null | undefined, user: User | null | undefined, signOut: () => void }>({ session: null, user: null, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>()
    const [session, setSession] = useState<Session | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            setSession(session)
            setUser(session?.user)
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user)
            setLoading(false)
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,
        signOut: () => supabase.auth.signOut(),
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};