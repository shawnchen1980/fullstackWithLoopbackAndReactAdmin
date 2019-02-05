import React, { Component } from "react";
import PropTypes from "prop-types";
import { propTypes, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import compose from "recompose/compose";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";

import {
  Notification,
  translate,
  userLogin,
  showNotification
} from "react-admin";
import { push } from "react-router-redux";

//import { darkTheme, lightTheme } from './themes';
const darkTheme = {
  palette: {
    type: "dark" // Switching the dark mode on is a single property value change.
  }
};

const lightTheme = {
  palette: {
    secondary: {
      light: "#5f5fc4",
      main: "#283593",
      dark: "#001064",
      contrastText: "#fff"
    }
  }
};
const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(https://source.unsplash.com/random/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  card: {
    minWidth: 300,
    marginTop: "6em"
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: theme.palette.secondary.main
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[500]
  },
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    marginTop: "1em"
  },
  actions: {
    padding: "0 1em 1em 1em"
  }
});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

class Login extends Component {
  login = ({ email, password }) => {
    // this.props.userLogin(
    //     auth,
    //     this.props.location.state
    //         ? this.props.location.state.nextPathname
    //         : '/'
    // );
    const { push, showNotification } = this.props;

    fetch("http://localhost:3000/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        console.log(res);
        if (res.status >= 400) throw new Error(res.statusText);
        showNotification("ra.auth.sign_up_success");
        push("/login");
      })
      .catch(e => {
        console.log(e);
        showNotification("ra.auth.sign_up_failure");
      });
  };

  render() {
    const {
      classes,
      handleSubmit,
      isLoading,
      translate,
      push,
      showNotification
    } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          <form onSubmit={handleSubmit(this.login)}>
            <div className={classes.hint}>Hint: demo / demo</div>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  autoFocus
                  name="email"
                  component={renderInput}
                  label={translate("ra.auth.email")}
                  disabled={isLoading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="password"
                  component={renderInput}
                  label={translate("ra.auth.password")}
                  type="password"
                  disabled={isLoading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="passRepeat"
                  component={renderInput}
                  label={translate("ra.auth.passRepeat")}
                  type="password"
                  disabled={isLoading}
                />
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                variant="raised"
                type="submit"
                color="primary"
                disabled={isLoading}
                className={classes.button}
                fullWidth
              >
                {isLoading && <CircularProgress size={25} thickness={2} />}
                {translate("ra.auth.sign_up")}
              </Button>
            </CardActions>
          </form>
        </Card>
        <Notification />
      </div>
    );
  }
}

Login.propTypes = {
  ...propTypes,
  authProvider: PropTypes.func,
  classes: PropTypes.object,
  previousRoute: PropTypes.string,
  translate: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
  translate,
  reduxForm({
    form: "signUp",
    validate: (values, props) => {
      const errors = {};
      const { translate } = props;
      if (!values.email) {
        errors.email = translate("ra.validation.required");
      }
      if (values.password !== values.passRepeat) {
        errors.password = translate("ra.validation.passRepeat");
      }
      if (!values.password) {
        errors.password = translate("ra.validation.required");
      }
      return errors;
    }
  }),
  connect(
    mapStateToProps,
    { userLogin, push, showNotification }
  ),
  withStyles(styles)
);

const EnhancedLogin = enhance(Login);

// We need to put the MuiThemeProvider decoration in another component
// Because otherwise the withStyles() HOC used in EnhancedLogin won't get
// the right theme
const LoginWithTheme = props => (
  <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
    <EnhancedLogin {...props} />
  </MuiThemeProvider>
);

export default LoginWithTheme;
