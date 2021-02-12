import React from "react";
import Header from "../header/header";
import useApiHook from "../../utils/apiHooks";
import Loader from "../../utils/loader";
import "./viewstock.css";
import axios from "axios";
import notifications from "../notification/notification";

function Viewstock({ history }) {
  const { apiData, isLoading } = useApiHook();

  const loadingData = isLoading ? (
    <Loader />
  ) : (
    <div className="view-stock">
      <h2>Stock detail of Different companies</h2>
      <Table data={apiData} history={history} />
    </div>
  );

  return (
    <>
      <Header />
      {loadingData}
    </>
  );
}

function Table({ data, history }) {
  const handlePredict = (symbol) => {
    history.push(`view-stock/predicted-stock/${symbol}`);
  };

  const handlePredictAdmin = (symbol) => {
    console.log("symbol", symbol);
    axios
      .get(`http://127.0.0.1:5000/predict-stock/${symbol}`)
      .then((data) => notifications.showSuccess(data.data))
      .catch((err) =>
        notifications.showWarning(`could not predict. try again`)
      );
    notifications.showInfo(`Predicting the stock data of ${symbol}`);
  };
  return (
    <table className="table table-striped">
      <thead className="thead-dark dark">
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Open</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Close</th>
          <th scope="col">Volume</th>
          <th scope="col">Company</th>
          <th scope="col">Predicted Close</th>
          {localStorage.getItem("token") &&
            JSON.parse(localStorage.getItem("role")) == 1 && (
              <th scope="col">Make Prediction</th>
            )}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, i) => (
            <tr key={i} className="item">
              <td>{item.symbol}</td>
              <td>{item.Open}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
              <td>{item.Close}</td>
              <td>{item.Volume}</td>
              <td>{item.company}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handlePredict(item.symbol)}
                >
                  Observe
                </button>
              </td>
              {localStorage.getItem("token") &&
                JSON.parse(localStorage.getItem("role")) == 1 && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handlePredictAdmin(item.symbol)}
                    >
                      Predict
                    </button>
                  </td>
                )}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Viewstock;
