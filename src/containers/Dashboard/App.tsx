import * as React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

const styles = require("./App.scss");
import "bootstrap/dist/css/bootstrap.css";
require("!style-loader!css-loader!bootstrap/dist/css/bootstrap.css");

interface AppProps {
  isLoading: boolean;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  state = {};

  render() {
    return <div id="app-wrapper">testing123</div>;
  }
}

function mapStateToProps(state: any) {
  return {
    isLoading: state.globalState.isLoading
  };
}

export default connect(
  mapStateToProps,
  {}
)(App);
