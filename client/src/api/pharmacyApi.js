import axios from "../config/axios"

export const  getMe = async () => {
    return await axios.get('/pharmacies')
}