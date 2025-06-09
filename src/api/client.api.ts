import axios from "axios"

export const getClients = () => {
    return axios.get('http://localhost:3000/api/users');
}

export const getClientBySearchTerm = (searchTerm: string) => {
    return axios.get(`${import.meta.env.VITE_API_URL}client/search?query=${searchTerm}`);
}

export const deleteAllClients = () => {
    return axios.delete(`${import.meta.env.VITE_API_URL}client`);
}

export const getProducts = () => {
    return axios.get('http://localhost:3000/api/products');
}