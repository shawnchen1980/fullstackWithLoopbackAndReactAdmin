import React, { Component } from "react";
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
  EditButton
} from "react-admin";
import ErrorBoundary from "./ErrorBoundary";
import ButtonOptions from "./ButtonOptions";
import TestItem from "./TestItem";
import { generateRandomCharArray } from "../utilities/random";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  test: {
    backgroundColor: "red",
    position: "relative",
    width: "100%",
    height: "100vh"
  },
  progress: {
    margin: "auto",
    display: "block"
  },
  rtolEnter: {
    transform: "translateX(100vw)"
  },
  ltorEnter: {
    transform: "translateX(-100vw)"
  },

  rtolEnterActive: {
    transform: "translateX(0)",
    transition: "all 500ms ease-in-out"
  },
  ltorEnterActive: {
    transform: "translateX(0)",
    transition: "all 500ms ease-in-out"
  },

  rtolLeave: {
    transform: "translateX(0)"
  },
  ltorLeave: {
    transform: "translateX(0)"
  },
  rtolLeaveActive: {
    transform: "translateX(-100vw)",
    transition: "all 500ms ease-in-out"
  },
  ltorLeaveActive: {
    transform: "translateX(100vw)",
    transition: "all 500ms ease-in-out"
  }
});
class TestItems extends Component {
  state = { index: 0, swipeToLeft: true, myPose: "inFromRight1" };

  handleToPrev = () => {
    const { ids, data, basePath } = this.props;
    this.setState({ swipeToLeft: false }, _ => {
      this.setState(prevState => {
        return !!prevState.index ? { index: prevState.index - 1 } : prevState;
      });
    });
  };
  handleToNext = () => {
    const { ids, data, basePath } = this.props;
    this.setState({ swipeToLeft: true }, _ => {
      this.setState(prevState => {
        return prevState.index < ids.length - 1
          ? { index: prevState.index + 1 }
          : prevState;
      });
    });
  };

  render() {
    const { ids, data, basePath, location, classes } = this.props;
    // console.log(ids, "data", data, location);
    // if (ids.length)
    //   [...data[ids[this.state.index]]["word"]["spelling"]].forEach(v =>
    //     console.log(generateRandomCharArray(v, 4))
    //   );
    console.log("rendering");
    const spelling =
      ids.length &&
      ids[this.state.index] &&
      data[ids[this.state.index]]["spelling"]
        ? data[ids[this.state.index]]["spelling"]
        : ids.length &&
          ids[this.state.index] &&
          data[ids[this.state.index]]["word"]
        ? data[ids[this.state.index]]["word"]["spelling"]
        : null;
    const renderItem = () => {
      return spelling ? (
        <TestItem
          key={this.state.index}
          mode="learning"
          spelling={spelling}
          onComplete={this.handleToNext}
        />
      ) : (
        <CircularProgress className={classes.progress} />
      );
    };
    const { swipeToLeft } = this.state;
    return (
      <ErrorBoundary>
        <div className={classes.test}>
          <button onClick={this.handleToPrev}>prev</button>
          <button onClick={this.handleToNext}>next</button>

          {/* <Box pose={this.state.myPose}>
            { {spelling ? (
              <TestItem
                key={this.state.index}
                mode="learning"
                spelling={spelling}
                onComplete={this.handleToNext}
              />
            ) : null} 
            renderItem()}
          </Box> */}
          <TransitionGroup>
            <CSSTransition
              timeout={{ exit: 300, enter: 1500 }}
              key={this.state.index}
              classNames={
                swipeToLeft
                  ? {
                      enter: classes.rtolEnter,
                      enterActive: classes.rtolEnterActive,

                      exit: classes.rtolLeaveActive,
                      exitActive: classes.rtolLeaveActive
                    }
                  : {
                      enter: classes.ltorEnter,
                      enterActive: classes.ltorEnterActive,

                      exit: classes.ltorLeaveActive,
                      exitActive: classes.ltorLeaveActive
                    }
              }
            >
              {renderItem()}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </ErrorBoundary>
    );
  }
}
const WordTestsWithRouter = withStyles(styles)(withRouter(TestItems));
export const WordTests = props => (
  <List {...props} perPage={5}>
    <WordTestsWithRouter />
  </List>
);

export const WordTestList = ({ dispatch, ...props }) => (
  <List {...props}>
    <WordTestsWithRouter />
  </List>
);
const stateToMap = state => ({
  filter: { bookId: state.currentWordbook }
});

export default connect(stateToMap)(WordTestList);
