import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { TextField, UPDATE } from "react-admin";
import { connect } from "react-redux";
const WORDBOOK_RENAME = "WORDBOOK_RENAME";
export const renameWordbook = (data, basePath, redirectUrl) => ({
  type: WORDBOOK_RENAME,
  payload: data,
  meta: {
    fetch: UPDATE,
    resource: "Wordbooks",
    onSuccess: {
      notification: {
        body: "resources.comments.notification.approved_success",
        level: "info"
      },
      redirectTo: redirectUrl,
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.comments.notification.approved_failure",
        level: "warning"
      }
    }
  }
});

class EditableTextField extends Component {
  constructor(props) {
    super(props);
    const { source, record } = this.props;
    this.state = { read: true, text: record[source] };
  }
  state = { read: true };
  handleClick = e => {
    e.stopPropagation();
    this.setState({ read: !this.state.read });
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  handleConfirm = e => {
    const {
      location: { pathname, search },
      basePath,
      renameWordbook,
      source,
      record
    } = this.props;
    console.log("record", record);
    renameWordbook(
      { data: { ...record, name: this.state.text }, id: record.id },
      basePath,
      pathname + search
    );
  };
  render() {
    const { source, record, location, match, history, basePath } = this.props;
    console.log("editable", location, match, history, basePath);
    const { renameWordbook, ...others } = this.props;
    return (
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {this.state.read ? (
          <TextField source={source} record={record} />
        ) : (
          <Fragment>
            <input onChange={this.handleChange} value={this.state.text} />
            <button onClick={this.handleConfirm}>confirm</button>
          </Fragment>
        )}
        <button onClick={this.handleClick}>change</button>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { renameWordbook }
  )(EditableTextField)
);
