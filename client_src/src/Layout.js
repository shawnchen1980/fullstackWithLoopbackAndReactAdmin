// in src/MyLayout.js
import React from "react";
import { Layout } from "react-admin";
import { withRouter } from "react-router-dom";
import MyAppBar from "./components/AppBar";
// import MyMenu from './MyMenu';
// import MyNotification from './MyNotification';

const MyLayout = props => {
  console.log(props);
  let result;
  if (props.location.pathname === "/signup") result = props.children;
  else
    result = (
      <Layout
        {...props}
        appBar={MyAppBar}
        // notification={MyNotification}
      />
    );
  console.log(result);
  return result;
};

export default withRouter(MyLayout);
