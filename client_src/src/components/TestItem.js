import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonOptions from "./ButtonOptions";
import { generateRandomCharArray } from "../utilities/random";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
class TestItem extends Component {
  state = { charIndex: 0, userInput: [] };
  handleInput(c) {
    const { spelling, mode, onComplete } = this.props;

    if (mode === "learning" && c !== spelling.charAt(this.state.charIndex))
      return;
    this.setState(preState => ({
      userInput: preState.userInput.concat(c),
      charIndex: preState.charIndex + 1
    }));
    if (this.state.userInput.length === spelling.length - 1)
      return setTimeout(() => {
        onComplete();
      }, 1000);
  }
  componentWillReceiveProps() {
    this.setState({ charIndex: 0, userInput: [] });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>{this.props.spelling}</h2>
        <h2>
          {this.state.userInput.join("") +
            "_".repeat(
              this.props.spelling.length - this.state.userInput.length
            )}
        </h2>
        {this.props.spelling.length > this.state.charIndex ? (
          <ButtonOptions
            letters={generateRandomCharArray(
              this.props.spelling.charAt(this.state.charIndex),
              2
            )}
            //letters={["a", "b", "c", "d"]}
            userInput={this.handleInput.bind(this)}
          />
        ) : null}
      </div>
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
