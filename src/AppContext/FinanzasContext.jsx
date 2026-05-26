import { createContext, useContext, useState } from "react";
import { setTokens } from "../services/authservice";
//1. crear contexto
const AppContext = createContext();

//2. Crear al provedor

export const FinanzasContext = ({children})=>{
    const [accessT, setAccessT] = useState(null)
    const [refreshT, setRefreshT] = useState(null)

    const login = (access, refresh) => {
        setTokens(access, refresh);
        setAccessT(access);
        setRefreshT(refresh);
    }

    const logout = () => {
        setAccessT(null);
        setRefreshT(null);
    }

    return(
        <AppContext.Provider value={{ accessT, refreshT, login, logout, setAccessT}}>
            {children}
        </AppContext.Provider>
    )
}
// hook personalizado para uso de contexto
export const useFinanzas = () => useContext(AppContext);