import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CreatePracticeButton from "./CreatePracticeButton";
import BrowseWordbookButton from "./BrowseWordbookButton";
import MyArrayInput from "./MyArrayInput";
import ControlledPanel from "./ControlledPanel";
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
import { actions } from "../features/Wordbook/state";
import { connect } from "react-redux";

const PostFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />
  </Filter>
);
export const WordbookList = connect(
  null,
  { ...actions }
)(({ setCurrentWordbook, setWordbook, ...props }) => {
  console.log("setCurrentWordbook", props);
  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid
        rowClick={(id, basePath, record) => {
          console.log(props.setWordbook);
          setCurrentWordbook(id);
          setWordbook(id);
          return "show";
        }}
      >
        <TextField source="name" />
        <TextField source="id" />
      </Datagrid>
    </List>
  );
});
export const WordbookListHoc = fn => props => (
  <WordbookList {...props} setCurrentWordbook={fn} />
);
// export const WordbookList = connect(
//   null,
//   { setWordbook: actions.setWordbook }
// )(WList);
export const WordbookEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="basic">
        <TextField source="id" />
        <TextInput source="name" />
      </FormTab>
      <FormTab label="words" path="showWords">
        <ReferenceManyField
          label="Words"
          reference="WordMappings"
          target="bookId"
          pagination={<Pagination />}
        >
          <Datagrid>
            <TextField source="wordId" />
            <TextField source="word.spelling" />
            <ReferenceField label="spelling" source="wordId" reference="Words">
              <TextField source="spelling" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="new words" path="addWords">
        {/* <MyArrayInput source="words" innerSource="spelling" /> */}
        <ControlledPanel source="words" />
      </FormTab>
    </TabbedForm>
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
    <CreatePracticeButton basePath={basePath} record={data} />
    <BrowseWordbookButton basePath={basePath} record={data} />
  </CardActions>
));
export const WordbookShow = props => (
  <Show actions={<WordbookActions />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="id" />
      <ReferenceManyField
        label="Words"
        reference="WordMappings"
        target="bookId"
      >
        <Datagrid>
          <TextField source="wordId" />
          <ReferenceField label="spelling" source="wordId" reference="Words">
            <TextField source="spelling" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
export const WordbookCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ArrayInput source="words">
        <SimpleFormIterator>
          <TextInput source="spelling" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
