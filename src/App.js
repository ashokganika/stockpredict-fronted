import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./component/footer/footer";
import Home from "./component/home/home";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Viewstock from "./component/viewstock/viewstock";
import StockPredicted from "./component/predictedStock/predictedStock";
import PageNoutFound from "./component/pagenotfound/pagenotfound";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      path={rest.path}
      exact={rest.exact}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute
            path="/view-stock/predicted-stock/:id"
            exact
            component={StockPredicted}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/view-stock" exact component={Viewstock} />
          <Route path="/" exact component={Home} />
          <Route component={PageNoutFound} />
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
