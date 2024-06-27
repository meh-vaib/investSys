import React, { useState, useEffect } from 'react';
import investmentService from '../services/investmentService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [investmentsOfCustomer, setInvestmentsOfCustomer] = useState([]);
    const [investment, setInvestment] = useState(null);
    const [investmentId, setInvestmentId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [newInvestmentData, setNewInvestmentData] = useState({
        investmentID: '',
        typeOfInvestment: '',
        dateOfInvestment: '',
        amount: 0,
        customerID: '',
    });
    const [editInvestmentData, setEditInvestmentData] = useState({
        investmentID: '',
        typeOfInvestment: '',
        dateOfInvestment: '',
        amount: 0,
        customerID: '',
    });

    useEffect(() => {
        getAllInvestments();
    }, []);

    const getAllInvestments = () => {
        investmentService.getAllInvestments().then(response => {
            setInvestments(response.data.data);
        });
    };

    const getInvestment = () => {
        investmentService.getInvestment(investmentId).then(response => {
            setInvestment(response.data);
        }).catch(error => {
            console.error('Error fetching investment:', error);
            setInvestment(null);
        });
    };

    const addInvestment = () => {
        investmentService.addInvestment(newInvestmentData).then(() => {
            getAllInvestments();
            setNewInvestmentData({
                investmentID:'',
                typeOfInvestment: '',
                amount: null,
                dateOfInvestment: '',
                customerID: '',
            });
        }).catch(error => {
            console.error('Error adding investment:', error);
        });
    };

    const editInvestment = () => {
        investmentService.updateInvestment(editInvestmentData).then(() => {
            getAllInvestments();
            setEditInvestmentData({
                investmentID: '',
                typeOfInvestment: '',
                dateOfInvestment: '',
                amount:0 ,
                customerID: '',
            });
        }).catch(error => {
            console.error('Error editing investment:', error);
        });
    };

    const deleteInvestment = (id) => {
        investmentService.deleteInvestment(id).then(() => {
            getAllInvestments();
        }).catch(error => {
            console.error('Error deleting investment:', error);
        });
    };

    const getInvestmentsOfCustomer = () => {
        investmentService.getInvestmentsOfCustomer(customerId).then(response => {
            setInvestmentsOfCustomer(response.data.data);
        }).catch(error => {
            console.error('Error fetching investments of customer:', error);
            setInvestmentsOfCustomer([]);
        });
    };

    const handleNewInvestmentChange = (e) => {
        const { name, value } = e.target;
        setNewInvestmentData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditInvestmentChange = (e) => {
        const { name, value } = e.target;
        setEditInvestmentData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

  return (
    <div  style={{ backgroundColor: '#2E4053' }}>
    <div className="container">
      <h1 className="text-center text-white">Investments</h1>
        <br/>
      {/* Display all investments as cards */}
      <div className="row text-white justify-content-center">
        <h3 className="text-center col-12">All Investments</h3>
        {investments.map(investment => (
          <div key={investment.investmentID} className="col-md-4 mb-4">
            <div className="card" style={{backgroundColor:'#E5E5EA'}}>
              <div className="card-body">
                <p>ID: {investment.investmentID}</p>
                <p>Type: {investment.typeOfInvestment}</p>
                <p>Date: {investment.dateOfInvestment}</p>
                <p>Customer ID: {investment.customerID}</p>
                <p>Customer Name: {investment.customerDetails.name}</p>
                <p>Customer Account Number: {investment.customerDetails.accNumber}</p>
                <button className="m-2 btn btn-danger" onClick={() => deleteInvestment(investment.investmentID)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <br/>

      {/* Display one investment based on investmentID */}
      <div className=" justify-content-center row text-white">
        <h3 className="col-12 text-center">Get Investment by ID</h3>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter Investment ID"
            value={investmentId}
            onChange={(e) => setInvestmentId(e.target.value)}
            className="form-control"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <button className="m-2 btn btn-primary" onClick={getInvestment}>Get Investment</button>
        </div>
        {investment && (
          <div className="col-md-4">
            <div className="card" style={{backgroundColor:'#E5E5EA'}}>
              <div className="card-body" >
                <p>Type: {investment.data.typeOfInvestment}</p>
                <p>Date: {investment.data.dateOfInvestment}</p>
                <p>Customer ID: {investment.data.customerID}</p>
                <p>Customer Name: {investment.data.customerDetails.name}</p>
                <p>Customer Account Number: {investment.data.customerDetails.accNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <br/>

      {/* Add an investment */}
      <div className="justify-content-center row text-white">
        <h3 className="text-center col-12">Add Investment</h3>
        <div className="col-md-4">
          <form >
            <div className="form-group">
              <label>Investment ID</label>
              <input
                type="text"
                placeholder="Investment ID"
                name="investmentID"
                value={newInvestmentData.investmentID}
                onChange={handleNewInvestmentChange}
                className="form-control border-0"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                placeholder="Type"
                name="typeOfInvestment"
                value={newInvestmentData.typeOfInvestment}
                onChange={handleNewInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Date (YYYY-MM-DD)</label>
              <input
                type="text"
                placeholder="Date (YYYY-MM-DD)"
                name="dateOfInvestment"
                value={newInvestmentData.dateOfInvestment}
                onChange={handleNewInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="text"
                placeholder="Customer ID"
                name="customerID"
                value={newInvestmentData.customerID}
                onChange={handleNewInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={newInvestmentData.amount}
                onChange={handleNewInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <button className="text-center m-2 btn btn-primary" onClick={addInvestment}>Add Investment</button>
          </form>
        </div>
      </div>
      <br/>

      {/* Edit an existing investment */}
      <div className="justify-content-center text-white row">
        <h3 className="col-12 text-center">Edit Investment</h3>
        <div className="col-md-4">
          <form>

              <div className="form-group">
              <label>Investment ID</label>
              <input
                type="text"
                placeholder="Investment ID"
                name="investmentID"
                value={editInvestmentData.investmentID}
                onChange={handleEditInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                placeholder="Type"
                name="typeOfInvestment"
                value={editInvestmentData.typeOfInvestment}
                onChange={handleEditInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Date (YYYY-MM-DD)</label>
              <input
                type="text"
                placeholder="Date (YYYY-MM-DD)"
                name="dateOfInvestment"
                value={editInvestmentData.dateOfInvestment}
                onChange={handleEditInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="text"
                placeholder="Customer ID"
                name="customerID"
                value={editInvestmentData.customerID}
                onChange={handleEditInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={editInvestmentData.amount}
                onChange={handleEditInvestmentChange}
                className="form-control"
                style={{backgroundColor:'#E5E5EA'}}
              />
            </div>
            <button className="m-2 btn btn-primary" onClick={editInvestment}>Edit Investment</button>
          </form>
        </div>
      </div>
      <br/>

      {/* Display investments of a single customer */}
      <div className="justify-content-center text-white row">
        <h3 className="col-12 text-center">Get Investments by Customer ID</h3>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="form-control"
            style={{backgroundColor:'#E5E5EA'}}
          />
          <button className="m-2 btn btn-primary" onClick={getInvestmentsOfCustomer}>Get Investments</button>
        </div>
        {investmentsOfCustomer.length > 0 && (
          <div className="col-md-8">
            {/* <h4>Investments of Customer {customerId}</h4> */}
            {investmentsOfCustomer.map(investment => (
              <div key={investment.investmentID} className="card mb-4">
                <div className="card-body" style={{backgroundColor:'#E5E5EA'}}>
                  <p>ID: {investment.investmentID}</p>
                  <p>Type: {investment.typeOfInvestment}</p>
                  <p>Date: {investment.dateOfInvestment}</p>
                  <p>Customer Name: {investment.customerDetails.name}</p>
                  <p>Customer Account Number: {investment.customerDetails.accNumber}</p>
                  <button className="m-2 btn btn-danger" onClick={() => deleteInvestment(investment.investmentID)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Investments;