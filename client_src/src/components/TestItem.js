import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonOptions from "./ButtonOptions";
import {
  generateRandomCharArray,
  generateCharArrayWith
} from "../utilities/random";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    display: "flex",
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "column",
    minWidth: 300,
    width: "100%",
    height: "100%",
    top: 50,
    left: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
class TestItem extends Component {
  state = {
    charIndex: 0,
    userInput: [],
    letters: generateCharArrayWith(this.props.spelling, 5)
  };
  handleInput(c) {
    const { spelling, mode, onComplete } = this.props;

    if (mode === "learning" && c !== spelling.charAt(this.state.charIndex))
      return;

    this.setState(
      preState => ({
        userInput: preState.userInput.concat(c),
        charIndex: preState.charIndex + 1
      }),
      () => {
        if (this.state.userInput.length === spelling.length)
          return setTimeout(() => {
            onComplete();
          }, 1000);
      }
    );
  }
  componentWillReceiveProps() {
    // this.setState({
    //   charIndex: 0,
    //   userInput: [],
    //   letters: generateCharArrayWith(this.props.spelling, 5)
    // });
  }
  componentDidMount() {
    console.log("componentDidMount from TestItem");
  }
  render() {
    const { classes } = this.props;
    console.log("spelling,letters ", this.props.spelling, this.state.letters);
    return (
      <Grid
        item
        container
        alignItems="center"
        justify="flex-start"
        direction="column"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Grid item>
          <h2>{this.props.hint}</h2>
        </Grid>
        <Grid item>
          <h2>{this.props.spelling}</h2>
        </Grid>
        <Grid item>
          <h2>
            {this.state.userInput.join("") +
              "_".repeat(
                this.props.spelling.length - this.state.userInput.length
              )}
          </h2>
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Grid item>
            {this.props.spelling.length > this.state.charIndex ? (
              <ButtonOptions
                key={this.props.spelling}
                letters={this.state.letters}
                spelling={this.props.spelling}
                charIndex={this.state.charIndex}
                theLetter={this.props.spelling.charAt(this.state.charIndex)}
                //letters={["a", "b", "c", "d"]}
                userInput={this.handleInput.bind(this)}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TestItem.propTypes = {
  spelling: PropTypes.string.isRequired
};

TestItem.defaultProps = {
  spelling: "wtf"
};

export default withStyles(styles)(TestItem);
