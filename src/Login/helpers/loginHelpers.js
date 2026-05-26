import axios from 'axios'

export const APILogin= async(email, password) => {
    const baseurl = "http://127.0.0.1:8000/api/financial/token"
    try {
        const response = await axios.post(baseurl,{
            username: email,
            password: password
        });

        if (response.status == 200){
            return response;
        }
    } catch (error){
        return error.response;
    }
}
export const newUser= async(data) => {
    const baseurl = "http://127.0.0.1:8000/api/financial/auth/register"
    try {
        const response = await axios.post(baseurl,{
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
        });

        if (response.status == 201){
            return response;
        }
    } catch (error){
        return error.response;
    }
}