import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
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
export const WordList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="spelling" />
      <TextField source="id" />
    </Datagrid>
  </List>
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
