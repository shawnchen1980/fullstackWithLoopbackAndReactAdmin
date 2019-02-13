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
import { actions } from "../features/Wordbook/state";
import { connect } from "react-redux";
export const WordbookList = ({ setCurrentWordbook, ...props }) => {
  console.log("setCurrentWordbook", props);
  return (
    <List {...props}>
      <Datagrid
        rowClick={(id, basePath, record) => {
          console.log(props.setWordbook);
          setCurrentWordbook(id);
          return "edit";
        }}
      >
        <TextField source="name" />
        <TextField source="id" />
      </Datagrid>
    </List>
  );
};
export const WordbookListHoc = fn => props => (
  <WordbookList {...props} setCurrentWordbook={fn} />
);
// export const WordbookList = connect(
//   null,
//   { setWordbook: actions.setWordbook }
// )(WList);
export const WordbookEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);
const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right"
};
const WordbookActions = withRouter(({ basePath, data, resource, history }) => (
  <CardActions style={cardActionStyle}>
    <EditButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
    <Button
      color="primary"
      onClick={() => {
        console.log(basePath, data, resource, history);
        history.push(`/wordsfrombooks/${data.id}/words`);
      }}
    >
      查看单词表
    </Button>
  </CardActions>
));
export const WordbookShow = props => (
  <Show actions={<WordbookActions />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="id" />
    </SimpleShowLayout>
  </Show>
);
export const WordbookCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="id" />
    </SimpleForm>
  </Create>
);
