import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as animate from "animate.css/animate.css";
const styles = theme => ({
  button: {
    margin: 10
  }
});

class ButtonOption extends Component {
  state = {
    animated: "",
    passed: false,
    mark: 0 //0 for unknown, 1 for wrong, 2 for right
  };
  componentWillMount() {
    this.setState({
      animated: [animate.animated, animate.bounceIn].join(" ")
    });
  }

  render() {
    const { classes, letter, userInput, correct, included } = this.props;
    const { mark } = this.state;
    return (
      <Button
        variant="contained"
        color={!mark ? "default" : mark === 2 ? "primary" : "secondary"}
        className={
          this.state.animated
            ? [classes.button, this.state.animated].join(" ")
            : classes.button
        }
        onAnimationEnd={_ => {
          if (this.props.included) this.setState({ animated: "" });
        }}
        onClick={() => {
          //userInput(letter);
          //console.log(animate);
          //console.log("el", el, animate.animated, animate.bounce);
          //el.classList.add(animate.animate, animate.bounce);
          if (this.state.passed) return;
          this.setState({
            animated: [
              animate.animated,
              correct
                ? animate.heartBeat
                : included
                ? animate.shake
                : animate.hinge
            ].join(" ")
          });
          if (correct) {
            this.setState({
              passed: true,
              mark: 2
            });
            userInput(letter);
          } else {
            this.setState({ mark: 1 }, _ => {
              setTimeout(_ => {
                this.setState({ mark: 0 });
              }, 500);
            });
          }

          //this.setState({ animated: true });
        }}
      >
        {letter}
      </Button>
    );
  }
}

ButtonOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonOption);
