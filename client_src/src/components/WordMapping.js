import React, { Component } from "react";
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
  EditButton,
  ReferenceManyField,
  ReferenceField,
  ArrayInput,
  SimpleFormIterator,
  Filter,
  TabbedForm,
  FormTab,
  Pagination
} from "react-admin";
import { parse } from "query-string";
import { connect } from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import WordTestList, { WordTestsWithRouter } from "./WordTests";
const renderView = mode => {
  console.log("mode is", mode);
  return mode === "edit" ? (
    <Datagrid rowClick="edit">
      <TextField source="wordbook.name" />
      <TextField source="word.spelling" />
      <TextField source="word.translation" />
    </Datagrid>
  ) : (
    <WordTestsWithRouter />
  );
};
const WList = ({ mode, dispatch, ...props }) => {
  console.log("mode", mode);
  return (
    <List key={mode} {...props} pagination={mode === "edit" ? undefined : null}>
      {renderView(mode)}
    </List>
  );
};
const stateToMap = state => ({
  filter: { bookId: state.currentWordbook }
});
export const WordmappingList = connect(stateToMap)(WList);

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right"
};

const Actions = (setEdit, setTest) => () => (
  <CardActions style={cardActionStyle}>
    <Button
      color="primary"
      onClick={() => {
        setEdit();
      }}
    >
      编辑模式
    </Button>

    <Button
      color="primary"
      variant="raised"
      onClick={() => {
        setTest();
      }}
    >
      练习模式
    </Button>
  </CardActions>
);
class WordmappingFinalList extends Component {
  state = { mode: "edit" };
  componentWillMount() {
    const { action } = parse(this.props.location.search);
    if (action === "test") {
      this.setState({ mode: "test" });
    }
  }
  setEdit = () => {
    this.setState({ mode: "edit" });
    console.log("setEdit");
  };
  setTest = () => {
    this.setState({ mode: "test" });
  };
  render() {
    const TActions = Actions(this.setEdit, this.setTest);
    return (
      <WordmappingList
        {...this.props}
        actions={<TActions />}
        mode={this.state.mode}
      />
    );
  }
}
export default WordmappingFinalList;
