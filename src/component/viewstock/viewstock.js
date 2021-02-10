import React from "react";
import Header from "../header/header";
import useApiHook from "../../utils/apiHooks";
import Loader from "../../utils/loader";
import "./viewstock.css";

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
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Viewstock;
