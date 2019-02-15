import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  List,
  Edit,
  Show,
  Create,
  Datagrid,
  TextField,
  TextInput,
  SimpleShowLayout,
  SimpleForm,
  EditButton
} from "react-admin";
import ButtonOptions from "./ButtonOptions";
import { generateRandomCharArray } from "../utilities/random";
class TestItems extends Component {
  state = { index: 0 };
  handleToPrev = () => {
    const { ids, data, basePath } = this.props;
    this.setState(prevState => {
      return !!prevState.index ? { index: prevState.index - 1 } : prevState;
    });
  };
  handleToNext = () => {
    const { ids, data, basePath } = this.props;
    this.setState(prevState => {
      return prevState.index < ids.length - 1
        ? { index: prevState.index + 1 }
        : prevState;
    });
  };
  render() {
    const { ids, data, basePath, location, hisotry } = this.props;
    console.log(ids, "data", data, location);
    if (ids.length)
      [...data[ids[this.state.index]]["spelling"]].forEach(v =>
        console.log(generateRandomCharArray(v, 4))
      );

    return (
      <div>
        <button onClick={this.handleToPrev}>prev</button>
        <button onClick={this.handleToNext}>next</button>

        <TextField record={data[ids[this.state.index]]} source="spelling" />
        <ButtonOptions letters={["a", "b", "c", "d"]} />
      </div>
    );
  }
}
const WordTestsWithRouter = withRouter(TestItems);
export const WordTests = props => (
  <List {...props} perPage={5}>
    <WordTestsWithRouter />
  </List>
);
