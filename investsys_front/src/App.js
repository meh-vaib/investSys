import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Investments from './components/Investments';
import Customers from './components/Customers';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/customers" element={<Customers />} />
            </Routes>
        </Router>
    );
};

export default App;
