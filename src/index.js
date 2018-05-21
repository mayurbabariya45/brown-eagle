import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import RootContainer from "./containers/RootContainer/RootContainer";

import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/sass/b2b-client.css";

const rootEl = document.getElementById("root");
ReactDOM.render(<RootContainer />, rootEl);

registerServiceWorker();
