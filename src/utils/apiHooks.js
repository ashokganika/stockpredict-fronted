import { useEffect, useState } from "react";
import axios from "axios";

const useApiHook = () => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:5000/view-stock")
      .then((data) => {
        setApiData(data.data);
      })
      .catch((err) => {
        console.log("err", err.response);
        setApiData(err.response);
      })
      .finally(() => setLoading(false));
  }, []);

  return { apiData, isLoading };
};

export default useApiHook;
