import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.interceptors.request.use(
  (req) => {
    console.log(req);
    // can edit the req parameter globally like middleware
    return req;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    (res) => {
      console.log(res);
      // can edit the res parameter globally like middleware
      return res;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
