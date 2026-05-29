import { createContext, useContext, useState, useEffect } from "react";
import { setAccessToken } from "../services/authservice";
//1. crear contexto
const AppContext = createContext();

//2. Crear al provedor

export const FinanzasContext = ({children})=>{
    const [accessT, setAccessT] = useState(null);
    useEffect(() => {
        const response = await axios.post(
            "https://finanzassimpleapi.onrender.com/api/financial/token/refresh/",
            {},
            {
                withCredentials: true,
            }
        );
        if(response.data.access){
            console.log(response)
            setAccessToken(response.data.access)
            setAccessT(response.data.access)
        }

    }, [])

    const login = (access) => {
        setAccessToken(access);
        setAccessT(access);
    }

    const logout = () => {
        setAccessT(null);
        setAccessToken(null)
    }

    return(
        <AppContext.Provider value={{ accessT, login, logout, setAccessT}}>
            {children}
        </AppContext.Provider>
    )
}
// hook personalizado para uso de contexto
export const useFinanzas = () => useContext(AppContext);
