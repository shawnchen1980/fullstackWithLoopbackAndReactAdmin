import React from "react";
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
import { connect } from "react-redux";
const WList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="bookId" />
      <TextField source="wordId" />

      <TextField source="wordbook.name" />
      <TextField source="word.spelling" />
    </Datagrid>
  </List>
);
const stateToMap = state => ({
  filter: { bookId: state.currentWordbook }
});
export const WordmappingList = connect(stateToMap)(WList);
