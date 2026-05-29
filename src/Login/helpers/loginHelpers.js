import axios from 'axios'

export const APILogin= async(email, password) => {
    const baseurl = "https://finanzassimpleapi.onrender.com/api/financial/token"
    try {
        const response = await axios.post(baseurl,{
            username: email,
            password: password
        },
        {
            withCredentials: true
        }
    );

        if (response.status == 200){
            return response;
        }
    } catch (error){
        return error.response;
    }
}
export const newUser= async(data) => {
    const baseurl = "https://finanzassimpleapi.onrender.com/api/financial/auth/register"
    try {
        const response = await axios.post(baseurl,{
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
            },
            {
                withCredentials: true
            }
        );

        if (response.status == 201){
            return response;
        }
    } catch (error){
        return error.response;
    }
}
