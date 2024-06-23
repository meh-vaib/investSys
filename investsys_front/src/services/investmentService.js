import axios from 'axios';

const API_URL = 'http://localhost:8080/investsys/investment'; 

const getAllInvestments = () => {
    return axios.get(API_URL);
};

const updateInvestment = (investment) =>{
    return axios.put(API_URL,investment);
}

const addInvestment = (investment) => {
    return axios.post(API_URL, investment);
};

const getInvestment = (investmentID) => {
    return axios.get(`${API_URL}/${investmentID}`);
};

const deleteInvestment = (investmentID) => {
    return axios.delete(`${API_URL}/${investmentID}`);
};

const getInvestmentsOfCustomer = (customerID) => {
    return axios.get(`${API_URL}/customer/${customerID}`);
};

export default {
    getAllInvestments,
    addInvestment,
    deleteInvestment,
    getInvestment,
    updateInvestment,
    getInvestmentsOfCustomer
};
