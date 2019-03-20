import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import * as animate from "animate.css/animate.css";
import Grid from "@material-ui/core/Grid";
import ButtonOption from "./ButtonOption";
const styles = theme => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // minWidth: 300,
    // width: "100%",
    // alignItems: "center",
    // justifyContent: "center"
    flexGrow: 1
  }
});

class ButtonOptions extends Component {
  state = {
    animated: false
  };
  render() {
    const {
      classes,
      letters,
      userInput,
      theLetter,
      charIndex,
      spelling
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} justify="center">
          {letters.map((letter, i) => {
            return (
              <Grid key={letter + i} item xs={6} sm={3}>
                <ButtonOption
                  key={letter + i}
                  letter={letter}
                  correct={letter === theLetter}
                  included={[...spelling].includes(letter)}
                  userInput={userInput}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

ButtonOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonOptions);
