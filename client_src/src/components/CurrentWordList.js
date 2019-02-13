import React from "react";
import { Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { withRouter } from "react-router";
import { connect } from "react-redux";
const MyResource = withRouter(props => <Resource {...props} />);
const stateToProps = state => {
  console.log(state.currentWordbook);
  return { currentWordbook: state.currentWordbook };
};
export default connect(stateToProps)(props => {
  console.log("currentwordlist is refreshed!", props.currentWordbook);
  return !!props.currentWordbook ? (
    <MyResource
      {...props}
      name={`Wordsfrombooks/${props.currentWordbook}/words`}
      list={ListGuesser}
    />
  ) : null;
});
