import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import notifications from "../notification/notification";

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
  console.log("apidata", apiData);
  return (
    <div>
      <Header />
      <h2>Predeicted Stock Of {props.match.params.id}</h2>
      <img src={url} alt="LSTM" />
    </div>
  );
}

export default PredictedStock;
