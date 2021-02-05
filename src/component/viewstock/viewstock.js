import React, { useEffect, useState } from "react";
import axios from "axios";
// import Data from "../../utils/stockdata";
import Header from "../header/header";
import "./viewstock.css";

function Viewstock({ history }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/view-stock")
      .then((data) => {
        console.log("data", data.data);
        setData(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="view-stock">
        <h2>Stock detail of Different companies</h2>
        <Table data={data} history={history} />
      </div>
    </>
  );
}

function Table({ data, history }) {
  const handlePredict = (symbol) => {
    history.push(`view-stock/predicted-stock/${symbol}`);
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
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
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
                class="btn btn-info"
                onClick={() => handlePredict(item.symbol)}
              >
                Observe
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Viewstock;
