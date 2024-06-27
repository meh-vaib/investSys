import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#2E4053' }}>
      <main className="container py-5">
        <h1 className=" text-center text-white  bold">Bank Boosters</h1>
        <div className="d-flex justify-content-center">
          <Link to="/investments">
            <button className="m-2 btn btn-primary btn-lg ">Investments</button>
          </Link>
          <Link to="/customers">
            <button className="m-2 btn btn-primary btn-lg">Customers</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;