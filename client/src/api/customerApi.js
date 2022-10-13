import axios from '../config/axios'

export const updateInfo = (input) =>{
    return axios.put('customers/healthInfo', input)
}

export const getCustomerById = (id) => {
    return axios.get(`/customers/${id}`)
}

export const getHealthInfoById = (id) => {
    return axios.get(`/customers/healthInfo/${id}`)
}