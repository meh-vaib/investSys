import React, { useEffect, useState } from 'react';
import customerService from '../services/customerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerService.getAllCustomers().then(response => {
            if (Array.isArray(response.data.data)) {
                setCustomers(response.data.data);
            } else {
                console.error("Unexpected response format:", response.data.data);
            }
        })
        .catch(error => {
            console.error("There was an error fetching the customers!", error);
        });
    }, []);

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.customerID}>
                        Name: {customer.name}, Account Number: {customer.accNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
