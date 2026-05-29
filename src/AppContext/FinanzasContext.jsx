import { createContext, useContext, useState } from "react";
import { setAccessToken } from "../services/authservice";
//1. crear contexto
const AppContext = createContext();

//2. Crear al provedor

export const FinanzasContext = ({children})=>{
    const [accessT, setAccessT] = useState("x");

    const login = (access) => {
        setAccessToken(access);
        setAccessT(access);
    }

    const logout = () => {
        setAccessT(null);
    }

    return(
        <AppContext.Provider value={{ accessT, login, logout, setAccessT}}>
            {children}
        </AppContext.Provider>
    )
}
// hook personalizado para uso de contexto
export const useFinanzas = () => useContext(AppContext);
