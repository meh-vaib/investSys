import axios from 'axios';

const API_URL = 'http://localhost:8080/investsys/customer';

const getAllCustomers = () => {
    return axios.get(API_URL);
};

const addCustomer = (customer) => {
    return axios.post(API_URL, customer);
};

const getCustomer = (customerID) => {
    return axios.get(`${API_URL}/${customerID}`);
}

const deleteCustomer = (customerID) => {
    return axios.delete(`${API_URL}/${customerID}`);
}

export default {
    getAllCustomers,
    addCustomer,
    getCustomer,
    deleteCustomer
};
