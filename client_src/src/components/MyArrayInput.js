import React, { Component, Fragment } from "react";
import { Field, change } from "redux-form";
import { connect } from "react-redux";
import {
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer
} from "react-admin";
class TextAreaForArray extends Component {
  state = { text: "" };
  handleInput = () => {
    const arr = this.state.text.split("/").map(v => ({ spelling: v }));
    const { openNext } = this.props;
    console.log(arr);
    console.log(this.props);
    this.props.change(this.props.meta.form, this.props.input.name, arr);
    openNext();
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  render() {
    return (
      <Fragment>
        <textarea value={this.state.text} onChange={this.handleChange} />
        <button type="button" onClick={() => this.handleInput()}>
          output
        </button>
      </Fragment>
    );
  }
}
export const connectedInput = connect(
  null,
  { change }
)(TextAreaForArray);
class MyArrayInput extends Component {
  render() {
    const { source, innerSource, record } = this.props;
    return (
      <Fragment>
        <ArrayInput source={source}>
          <SimpleFormIterator>
            <TextInput source={innerSource} />
          </SimpleFormIterator>
        </ArrayInput>

        <Field name={source} component={connectedInput} />
      </Fragment>
    );
  }
}
export default MyArrayInput;
