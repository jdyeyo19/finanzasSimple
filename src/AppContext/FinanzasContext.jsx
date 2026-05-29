import { createContext, useContext, useState } from "react";
import { setAccessToken } from "../services/authservice";
//1. crear contexto
const AppContext = createContext();

//2. Crear al provedor

export const FinanzasContext = ({children})=>{
    const [accessT, setAccessT] = useState(async()=>{
        const response = await axios.post(
                    "https://finanzassimpleapi.onrender.com/api/financial/token/refresh/",
                    {},
                    {
                        withCredentials: true,
                    }
                );
        if(response.data.access){
            setAccessToken(response.data.access)
            return response.data.access
        }else{
         return null   
        }
    });

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
