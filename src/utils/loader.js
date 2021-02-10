import React from "react";
import Loader from "react-loader-spinner";
import "./loader.css";

function Loaders() {
  return (
    <div className="loader">
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
}

export default Loaders;
