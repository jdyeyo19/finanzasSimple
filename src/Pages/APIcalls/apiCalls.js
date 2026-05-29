import { axiosInstance } from "./axiosInstance";
//obtener informacion del usuario
export const userInfo= async() => {
        const response = await axiosInstance.get("/auth/profile/");
        return response.data
}
//Registrar nueva transaccion.
export const createTransaction = async ({
    description,
    amount,
    t_type,
    category,
    date,
}) => {

    const response = await axiosInstance.post(
        "/transactions/",
        {
            description,
            amount,
            t_type,
            category,
            date,
        }
    );

    return response.data;
};
//Borrar una transaccion
export const deleteTransaction = async (id) => {

    const response = await axiosInstance.delete(
        `/transactions/${id}/`
    );

    return response.data;
};
//editar una transaccion
export const editTransaction = async (
    id,
    transactionData
) => {

    const response = await axiosInstance.put(
        `/transactions/${id}/`,
        transactionData
    );

    return response.data;
};
//Busqueda con o sin filtros
export const filteredTransactions = async (filters) => {

    const params = new URLSearchParams(filters);

    const response = await axiosInstance.get(
        `/transactions/?${params.toString()}`
    );
    if(response.data.results){
        return response.data.results;
    }else{
        return response.data
    }
};
//actulizar user data
export const updateProfile = async (
    profileData
) => {

    const response = await axiosInstance.patch(
        "/auth/profile/",
        profileData
    );

    return response.data;
};
export const changePassword = async (passwordData) => {

    const response = await axiosInstance.patch(
        "/auth/change-password/",
        passwordData
    );

    return response.data;
};
//cerrar sesion
export const endSession =  async()=>{
    const response = await axiosInstance.post(
        "/logout/"
    );
    return response
}