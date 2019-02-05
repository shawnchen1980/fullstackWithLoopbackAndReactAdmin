import React from 'react';
import {List,Edit,Show,Create,Datagrid,TextField,TextInput,SimpleShowLayout,SimpleForm} from 'react-admin'
export const WordbookList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
        </Datagrid>
    </List>
);
export const WordbookEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="id" />
        </SimpleForm>
    </Edit>
);
export const WordbookShow = props => (
    <Show {...props}>
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