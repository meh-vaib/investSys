// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Investment System</h1>
            <div>
                <Link to="/investments"><button>Investments</button></Link>
                <br></br>
                <Link to="/customers"><button>Customers</button></Link>
            </div>
        </div>
    );
};

export default Home;
