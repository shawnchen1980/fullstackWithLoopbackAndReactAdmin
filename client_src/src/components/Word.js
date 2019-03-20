import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
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
const stateToProps = state => ({
  api_url: state.currentWordbook
    ? `wordbooks/${state.currentWordbook}/words`
    : "words",
  filter: { bookId: state.currentWordbook }
});
export const WordList = connect(stateToProps)(
  ({ api_url, filter, dispatch, ...props }) => (
    <List {...props} filter={{ ...filter }}>
      <Datagrid rowClick="edit">
        <TextField source="word.spelling" />
        <TextField source="word.translation" />
        <TextField source="id" />
      </Datagrid>
    </List>
  )
);

export const WordEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="spelling" />
      <TextInput source="translation" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);

export const WordShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="spelling" />
      <TextField source="translation" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);

export const WordCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="spelling" />
      <TextInput source="translation" />
      <TextInput source="id" />
    </SimpleForm>
  </Create>
);
