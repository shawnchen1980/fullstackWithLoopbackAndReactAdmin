import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import * as animate from "animate.css/animate.css";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    },
    "&:focus": {
      "& $imageRight,& $imageWrong": {
        opacity: 1
      }
    }
  },
  animationLast: {
    animationFillMode: "forwards"
  },
  focusVisible: {},
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "grey"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageRight: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "green",
    opacity: 0,
    transition: theme.transitions.create("opacity"),
    transitionDuration: "500ms"
  },
  imageWrong: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "red",
    opacity: 0,
    transition: theme.transitions.create("opacity"),
    transitionDuration: "500ms"
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

class ButtonOption extends Component {
  state = {
    animated: "",
    passed: false
  };
  componentWillMount() {
    this.setState({
      animated: [animate.animated, animate.bounceIn].join(" ")
    });
  }

  render() {
    const { classes, letter, userInput, correct } = this.props;

    return (
      <ButtonBase
        focusRipple
        key={letter}
        className={
          this.state.animated
            ? [classes.image, this.state.animated].join(" ")
            : classes.image
        }
        focusVisibleClassName={classes.focusVisible}
        onClick={() => {
          //userInput(letter);
          //console.log(animate);
          //console.log("el", el, animate.animated, animate.bounce);
          //el.classList.add(animate.animate, animate.bounce);
          this.setState({
            animated: [
              animate.animated,
              correct ? animate.heartBeat : animate.hinge
            ].join(" ")
          });
          if (correct) {
            this.setState({
              passed: true
            });
          }

          //this.setState({ animated: true });
        }}
        onAnimationEnd={e => {
          //this.setState({ animated: "" });
          console.log(e.animationName);
          if (this.state.passed) {
            console.log("going to pass");
            setTimeout(() => {
              //this.setState({ animated: "" });
              userInput(letter);
            }, 500);
          }
        }}
        // onTransitionEnd={e => {
        //   console.log(
        //     "transition",
        //     e.propertyName,
        //     e.pseudoElement,
        //     e.elapsedTime
        //   );
        //   userInput(letter);
        // }}
        style={{
          width: "50%",
          maxWidth: 200,
          animationFillMode: "forwards",
          margin: 10
        }}
      >
        <span className={classes.imageSrc} />
        <span
          className={
            this.props.correct ? classes.imageRight : classes.imageWrong
          }
        />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {letter}
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    );
  }
}

ButtonOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonOption);
