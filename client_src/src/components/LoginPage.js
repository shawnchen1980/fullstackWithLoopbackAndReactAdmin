// in src/MyLoginPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {Formik,Form,Field} from 'formik';
class MyLoginPage extends Component {
    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = { };
        console.log(e)
        // Dispatch the userLogin action (injected by connect)
        this.props.userLogin(credentials);

    }

    render() {
        return (
            
            <Formik 
                onSubmit={(values,{setSubmitting})=>{
                    this.props.userLogin(values);
                    setSubmitting(false);
                }}
                
            >
            <Form>
                <Field name="email"/>
                <Field name="password"/>
                <button>submit</button>
            </Form>
            </Formik>

           
        );
    }
};

export default connect(undefined, { userLogin })(MyLoginPage);