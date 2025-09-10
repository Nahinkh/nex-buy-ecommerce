import React, { createContext, useContext, useState } from 'react'
import { toast } from 'sonner';

interface AppContextProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setError: (msg: string | null) => void;
}

const AppContext = createContext<AppContextProps>({
    loading: false,
    setLoading: () => { },
    setError: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const setError = (msg: string | null) => {
        if (msg) {
            toast.error(msg || "Something went wrong");
        }
    }

    return (
        <AppContext.Provider value={{ loading, setLoading, setError }}>
            {children}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);