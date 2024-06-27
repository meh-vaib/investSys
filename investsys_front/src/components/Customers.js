import React, { useState, useEffect } from 'react';
import customerService from '../services/customerService';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const getAllCustomers = async () => {
    try {
      const response = await customerService.getAllCustomers();
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const getCustomer = async () => {
    try {
      const response = await customerService.getCustomer(customerId);
      setCustomer(response.data.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      setCustomer(null);
    }
  };

  const addCustomer = async () => {
    try {
      await customerService.addCustomer(newCustomerData);
      getAllCustomers();
      setNewCustomerData({
        customerID: '',
        name: '',
        accNumber: '',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customerService.deleteCustomer(id);
      getAllCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ backgroundColor: '#2E4053' }}>
    <div className="container">
      <div className="text-center text-white"><h1>Customers</h1></div>
        <br/>
      {/* Display all customers as cards */}
      <div className="row text-white ">
        <h3 className="col-12 text-center">All Customers</h3>
        {customers.map((customer) => (
          <div key={customer.customerID} className="col-md-4 mb-4">
            <div className="card" style={{backgroundColor:'#E5E5EA'}}>
                <div className="card-body">
                    <p>ID: {customer.customerID}</p>
                    <p>Name: {customer.name}</p>
                    <p>Account Number: {customer.accNumber}</p>
                    <button className="m-2 btn btn-danger" onClick={() => deleteCustomer(customer.customerID)}>Delete</button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display one customer based on customerID */}
      <div className="row justify-content-center">
        <h3 className="col-12 text-white text-center">Get Customer by ID</h3>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="form-control"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <button
            className="btn btn-primary m-2"
            onClick={getCustomer}
          >
            Get Customer
          </button>
          {customer && (
            <div
              className="card"
              style={{backgroundColor:'#E5E5EA'}}
            >
              <div className="card-body">
                <p>ID: {customer.customerID}</p>
                <p>Name: {customer.name}</p>
                <p>Account Number: {customer.accNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add a customer */}
      <div className="row justify-content-center">
        <h3 className="col-12 text-white text-center">Add Customer</h3>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Customer ID"
            name="customerID"
            value={newCustomerData.customerID}
            onChange={handleNewCustomerChange}
            className="form-control m-2"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newCustomerData.name}
            onChange={handleNewCustomerChange}
            className="form-control m-2"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <input
            type="text"
            placeholder="Account Number"
            name="accNumber"
            value={newCustomerData.accNumber}
            onChange={handleNewCustomerChange}
            className="form-control m-2"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <button
            className="btn btn-primary m-2"
            onClick={addCustomer}
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Customers;