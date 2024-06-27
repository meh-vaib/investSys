import React, { useState, useEffect } from 'react';
import customerService from '../services/customerService';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [newCustomerData, setNewCustomerData] = useState({
        customerID: '',
        name: '',
        accNumber: '',
    });

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        customerService.getAllCustomers().then(response => {
            setCustomers(response.data.data);
        }).catch(error => {
            console.error('Error fetching customers:', error);
        });
    };

    const getCustomer = () => {
        customerService.getCustomer(customerId).then(response => {
            setCustomer(response.data.data);
        }).catch(error => {
            console.error('Error fetching customer:', error);
            setCustomer(null);
        });
    };

    const addCustomer = () => {
        customerService.addCustomer(newCustomerData).then(() => {
            getAllCustomers();
            setNewCustomerData({
                customerID: '',
                name: '',
                accNumber: '',
            });
        }).catch(error => {
            console.error('Error adding customer:', error);
        });
    };

    const deleteCustomer = (id) => {
        customerService.deleteCustomer(id).then(() => {
            getAllCustomers();
        }).catch(error => {
            console.error('Error deleting customer:', error);
        });
    };

    const handleNewCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomerData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Customers</h2>
            
            {/* Display all customers as cards */}
            <div>
                <h3>All Customers</h3>
                {customers.map(customer => (
                    <div key={customer.customerID} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                        <p>ID: {customer.customerID}</p>
                        <p>Name: {customer.name}</p>
                        <p>Account Number: {customer.accNumber}</p>
                        <button onClick={() => deleteCustomer(customer.customerID)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Display one customer based on customerID */}
            <div>
                <h3>Get Customer by ID</h3>
                <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <button onClick={getCustomer}>Get Customer</button>
                {customer && (
                    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                        <p>ID: {customer.customerID}</p>
                        <p>Name: {customer.name}</p>
                        <p>Account Number: {customer.accNumber}</p>
                    </div>
                )}
            </div>

            {/* Add a customer */}
            <div>
                <h3>Add Customer</h3>
                <input
                    type="text"
                    placeholder="Customer ID"
                    name="customerID"
                    value={newCustomerData.customerID}
                    onChange={handleNewCustomerChange}
                />
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={newCustomerData.name}
                    onChange={handleNewCustomerChange}
                />
                <input
                    type="text"
                    placeholder="Account Number"
                    name="accNumber"
                    value={newCustomerData.accNumber}
                    onChange={handleNewCustomerChange}
                />
                <button onClick={addCustomer}>Add Customer</button>
            </div>
        </div>
    );
};

export default Customers;
