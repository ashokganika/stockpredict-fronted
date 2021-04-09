import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import notifications from "../notification/notification";
import Loaders from "../../utils/loader";
import "./style.css";

function PredictedStock(props) {
  let imgUrl = `http://127.0.0.1:5000/image/${props.match.params.id}`;
  let predicetedDataUrl = `http://127.0.0.1:5000/vew-predicted-stock/${
    props.match.params.id
  }/token=${localStorage.getItem("token")}`;
  let historyPredcietdUrl = `http://127.0.0.1:5000/view-past-predicted-stock/${props.match.params.id}`;

  const [apiData, setApiData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .all([axios.get(predicetedDataUrl), axios.get(historyPredcietdUrl)])
      .then((data) => {
        setApiData(data[0].data);
        setHistoryData(data[1].data);
      })

      .catch((err) => {
        // console.log("err", err.response);
        setApiData(err.response);
        notifications.showWarning(`something went wrong`);
      })
      .finally(() => setLoading(false));
  }, [predicetedDataUrl, historyPredcietdUrl]);

  return (
    <div>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          {" "}
          <Header />
          <div className="predicted-stock-container">
            <div className="predicted-stock">
              {" "}
              <h3>Predicted Stock Of {props.match.params.id}</h3>
              <div className="analysischart">
                <img src={imgUrl} alt="LSTM" />
                <small>Analysis chart </small>
              </div>
              <h3 className="tommrrow">
                Tomorrow's Price: $
                <span>
                  {apiData && apiData.length > 0
                    ? apiData[0].data.split(/[\s,:]+/)[1]
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
                  {historyData &&
                    historyData
                      .slice(Math.max(historyData.length - 5, 1))
                      .map((item, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{item.real}</td>
                          <td>{item.data.split(/[\s,:]+/)[1]}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PredictedStock;
