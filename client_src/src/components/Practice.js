import React from "react";
import { Redirect } from "react-router";
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
  DateField,
  ReferenceField
} from "react-admin";
export const PracticeList = ({ setCurrentWordbook, ...props }) => {
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
        <DateField source="lastAccessed" />
        <TextField source="id" />

        <ReferenceField source="bookId" reference="Wordbooks">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="progress" />
      </Datagrid>
    </List>
  );
};
// export const Appusers/me/practiceList = props => (
//   <List {...props}>
//       <Datagrid rowClick="edit">
//           <DateField source="lastAccessed" />
//           <TextField source="id" />

//           <ReferenceField source="bookId" reference="Wordbooks"><TextField source="name" /></ReferenceField>
//           <TextField source="progress" />
//       </Datagrid>
//   </List>

export const PracticeListHoc = fn => props => (
  <PracticeList {...props} setCurrentWordbook={fn} />
);
// export const WordbookList = connect(
//   null,
//   { setWordbook: actions.setWordbook }
// )(WList);
export const PracticeRedirect = props => {
  console.log(props);
  return <Redirect to={`/testsfrombooks/${props.id}/words`} />;
};
