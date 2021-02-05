import React from "react";
import "./table.css";

function Table({ data }) {
  return (
    <div className={data.name}>
      <h3 className="table-name">{data.name}</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
            <th scope="col">% Change</th>
          </tr>
        </thead>
        <tbody>
          {data.detail.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.change}</td>
              <td>{item.ChnagePerCentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
