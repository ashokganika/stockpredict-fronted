import React from "react";

import Header from "../header/header";
import stockImage from "../../assest/stock.jpeg";
import "./home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="detail">
          We provide future predicted data generated from our machine learning
          algorithm.
        </div>
        <div className="image">
          <img src={stockImage} alt="stock" srcset="" />
        </div>
      </div>
    </>
  );
}

export default Home;
