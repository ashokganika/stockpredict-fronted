import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import notifications from "../notification/notification";
import Loaders from "../../utils/loader";
import "./style.css";

function PredictedStock(props) {
  let url = `http://127.0.0.1:5000/image/${props.match.params.id}`;

  const [apiData, setApiData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://127.0.0.1:5000/vew-predicted-stock/${
          props.match.params.id
        }/token=${localStorage.getItem("token")}`
      )
      .then((data) => {
        setApiData(data.data);
      })
      .catch((err) => {
        // console.log("err", err.response);
        setApiData(err.response);
        notifications.showWarning(`something went wrong`);
      })
      .finally(() => setLoading(false));
  }, []);

  // console.log("url", url, props.match.params.id);
  // console.log("apidata", apiData[0].data);

  return (
    <div>
      <Header />
      <div className="predicted-stock-container">
        <div className="predicted-stock">
          {" "}
          <h3>Predicted Stock Of {props.match.params.id}</h3>
          <div className="analysischart">
            <img src={url} alt="LSTM" />
            <small>Analysis chart </small>
          </div>
          <h3 className="tommrrow">
            Tomorrow's Price($)
            <span>
              {apiData && apiData.length > 0
                ? apiData[0].data.split("'")[2]
                : "no data"}
            </span>
          </h3>
        </div>
        <div className="predicted-history">
          <h3>{props.match.params.id} stock comparsion to our's data</h3>
          <h5>price past 5 days</h5>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Real Price</th>
                <th scope="col">Predicted Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>123.44</td>
                <td>124.33</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>123.44</td>
                <td>124.33</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>123.44</td>
                <td>124.33</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>123.44</td>
                <td>124.33</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>123.44</td>
                <td>124.33</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PredictedStock;
