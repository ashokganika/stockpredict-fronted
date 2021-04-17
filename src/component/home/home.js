import React from "react";

import Header from "../header/header";
import stockImage from "../../assest/stock.jpeg";
import "./home.css";

function Home({ history }) {
  return (
    <>
      <Header />
      <div className="container">
        <div className="detail">
          <div>
            We provide future predicted data generated from our machine learning
            algorithm.
          </div>
          <button
            className="btn btn-info"
            onClick={() => history.push("/view-stock")}
          >
            let's Analyze
          </button>
        </div>
        <div className="image">
          <img src={stockImage} alt="stock" srcset="" />
        </div>
      </div>
    </>
  );
}

export default Home;
