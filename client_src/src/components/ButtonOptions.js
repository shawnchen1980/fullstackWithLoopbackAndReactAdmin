import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import * as animate from "animate.css/animate.css";
import ButtonOption from "./ButtonOption";
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
      "& $imageRight": {
        opacity: 1,
        transitionDuration: "500ms"
      }
    }
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

class ButtonOptions extends Component {
  state = {
    animated: false
  };
  render() {
    const { classes, letters, userInput, theLetter, charIndex } = this.props;

    return (
      <div className={classes.root}>
        {letters.map(letter => {
          return (
            <ButtonOption
              key={letter + charIndex}
              letter={letter}
              correct={letter === theLetter}
              userInput={userInput}
            />
          );

          // let el;
          // return (
          //   <ButtonBase
          //     focusRipple
          //     key={letter}
          //     className={
          //       this.state.animated
          //         ? [classes.image, animate.animated, animate.bounce].join(" ")
          //         : classes.image
          //     }
          //     focusVisibleClassName={classes.focusVisible}
          //     ref={b => (el = b)}
          //     onClick={() => {
          //       //userInput(letter);
          //       console.log(animate);
          //       console.log("el", el, animate.animated, animate.bounce);
          //       //el.classList.add(animate.animate, animate.bounce);
          //       this.setState({ animated: !this.state.animated });
          //       //this.setState({ animated: true });
          //     }}
          //     onAnimationEnd={() => {
          //       this.setState({ animated: false });
          //     }}
          //     // onTransitionEnd={e => {
          //     //   console.log(
          //     //     "transition",
          //     //     e.propertyName,
          //     //     e.pseudoElement,
          //     //     e.elapsedTime
          //     //   );
          //     //   userInput(letter);
          //     // }}
          //     style={{
          //       width: "50%",
          //       maxWidth: 200
          //     }}
          //   >
          //     <span className={classes.imageSrc} />
          //     <span className={classes.imageRight} />
          //     <span className={classes.imageButton}>
          //       <Typography
          //         component="span"
          //         variant="subtitle1"
          //         color="inherit"
          //         className={classes.imageTitle}
          //       >
          //         {letter}
          //         <span className={classes.imageMarked} />
          //       </Typography>
          // //     </span>
          //   </ButtonBase>
          // );
        })}
      </div>
    );
  }
}

ButtonOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonOptions);
