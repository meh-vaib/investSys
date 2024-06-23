import React, { useState, useEffect } from 'react';
import investmentService from '../services/investmentService';

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
        <div>
            <h2>Investments</h2>
            
            {/* Display all investments as cards */}
            <div>
                <h3>All Investments</h3>
                {investments.map(investment => (
                    <div key={investment.investmentID} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                        <p>ID: {investment.investmentID}</p>
                        <p>Type: {investment.typeOfInvestment}</p>
                        <p>Date: {investment.dateOfInvestment}</p>
                        <p>Customer ID: {investment.customerID}</p>
                        <p>Customer Name: {investment.customerDetails.name}</p>
                        <p>Customer Account Number: {investment.customerDetails.accNumber}</p>
                        <button onClick={() => deleteInvestment(investment.investmentID)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Display one investment based on investmentID */}
            <div>
                <h3>Get Investment by ID</h3>
                <input
                    type="text"
                    placeholder="Enter Investment ID"
                    value={investmentId}
                    onChange={(e) => setInvestmentId(e.target.value)}
                />
                <button onClick={getInvestment}>Get Investment</button>
                {console.log(investment)}
                {investment && (
                    <div key={investment.data.investmentID} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                        <p>Type: {investment.data.typeOfInvestment}</p>
                        <p>Date: {investment.data.dateOfInvestment}</p>
                        <p>Customer ID: {investment.data.customerID}</p>
                        <p>Customer Name: {investment.data.customerDetails.name}</p>
                        <p>Customer Account Number: {investment.data.customerDetails.accNumber}</p>
                    </div>
                )}
            </div>

            {/* Add an investment */}
            <div>
                <h3>Add Investment</h3>
                <input
                    type="text"
                    placeholder="Investment ID"
                    name="investmentID"
                    value={newInvestmentData.investmentID}
                    onChange={handleNewInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="typeOfInvestment"
                    value={newInvestmentData.typeOfInvestment}
                    onChange={handleNewInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Date (YYYY-MM-DD)"
                    name="dateOfInvestment"
                    value={newInvestmentData.dateOfInvestment}
                    onChange={handleNewInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Customer ID"
                    name="customerID"
                    value={newInvestmentData.customerID}
                    onChange={handleNewInvestmentChange}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={newInvestmentData.amount}
                    onChange={handleNewInvestmentChange}
                />
                <button onClick={addInvestment}>Add Investment</button>
            </div>

            {/* Edit an existing investment */}
            <div>
                <h3>Edit Investment</h3>
                <input
                    type="text"
                    placeholder="Investment ID"
                    name="investmentID"
                    value={editInvestmentData.investmentID}
                    onChange={handleEditInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="typeOfInvestment"
                    value={editInvestmentData.typeOfInvestment}
                    onChange={handleEditInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Date (YYYY-MM-DD)"
                    name="dateOfInvestment"
                    value={editInvestmentData.dateOfInvestment}
                    onChange={handleEditInvestmentChange}
                />
                <input
                    type="text"
                    placeholder="Customer ID"
                    name="customerID"
                    value={editInvestmentData.customerID}
                    onChange={handleEditInvestmentChange}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={newInvestmentData.amount}
                    onChange={handleNewInvestmentChange}
                />
                <button onClick={editInvestment}>Edit Investment</button>
            </div>

            {/* Display investments of a single customer */}
            <div>
                <h3>Get Investments by Customer ID</h3>
                <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <button onClick={getInvestmentsOfCustomer}>Get Investments</button>
                {investmentsOfCustomer.length > 0 && (
                    <div>
                        <h4>Investments of Customer {customerId}</h4>
                        {investmentsOfCustomer.map(investment => (
                            <div key={investment.investmentID} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                            <p>ID: {investment.investmentID}</p>
                            <p>Type: {investment.typeOfInvestment}</p>
                            <p>Date: {investment.dateOfInvestment}</p>
                            <p>Customer Name: {investment.customerDetails.name}</p>
                            <p>Customer Account Number: {investment.customerDetails.accNumber}</p>
                            <button onClick={() => deleteInvestment(investment.investmentID)}>Delete</button>
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Investments;
