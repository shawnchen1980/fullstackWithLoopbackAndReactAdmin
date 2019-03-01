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
  api_url: `wordbooks/${state.currentWordbook}/words`
});
export const WordList = connect(stateToProps)(
  ({ api_url, filter, ...props }) => (
    <List {...props} filter={{ ...filter, api_url }}>
      <Datagrid rowClick="edit">
        <TextField source="spelling" />
        <TextField source="id" />
      </Datagrid>
    </List>
  )
);

export const WordEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="spelling" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);

export const WordShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="spelling" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);

export const WordCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="spelling" />
      <TextInput source="id" />
    </SimpleForm>
  </Create>
);
