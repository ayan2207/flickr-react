import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import reduxStore from "./redux-store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./containers/Dashboard/App";

import "./index.scss";

const MyApp = () => (
  <Provider store={reduxStore}>
    <MuiThemeProvider>
      <Router>
        <Route exact={true} path="/" component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<MyApp />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
