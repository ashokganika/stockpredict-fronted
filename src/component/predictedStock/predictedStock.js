import React, { useEffect } from "react";
import Header from "../header/header";

function PredictedStock(props) {
  let url = "http://127.0.0.1:5000/image";
  return (
    <div>
      {console.log("props", props)}
      <Header />
      <h2>Predeicted Stock Of {props.match.params.id}</h2>
      <img src={url} alt="LSTM" />
    </div>
  );
}

export default PredictedStock;