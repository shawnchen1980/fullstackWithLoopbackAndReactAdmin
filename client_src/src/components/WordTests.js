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
import Grid from "@material-ui/core/Grid";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   minWidth: 300,
  //   width: "100%",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
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
  componentWillReceiveProps() {
    const { ids } = this.props;
    const { swipeToLeft } = this.state;
    if (swipeToLeft) this.setState({ index: 0 });
    else this.setState({ index: ids.length - 1 });
  }
  handleToPrev = () => {
    const { ids, data, basePath, setPage, page } = this.props;
    this.setState({ swipeToLeft: false }, _ => {
      if (this.state.index === 0 && page > 1) {
        setPage(page - 1);
      } else {
        this.setState(prevState => {
          return !!prevState.index ? { index: prevState.index - 1 } : prevState;
        });
      }
    });
  };
  handleToNext = () => {
    const { ids, data, basePath, setPage, page, perPage, total } = this.props;
    this.setState({ swipeToLeft: true }, _ => {
      if (this.state.index === ids.length - 1 && total > page * perPage) {
        setPage(page + 1);
      } else {
        this.setState(prevState => {
          return prevState.index < ids.length - 1
            ? { index: prevState.index + 1 }
            : prevState;
        });
      }
    });
  };

  render() {
    const {
      ids,
      data,
      basePath,
      location,
      classes,
      setPage,
      page,
      perPage,
      total,
      isLoading
    } = this.props;
    // console.log(ids, "data", data, location);
    // if (ids.length)
    //   [...data[ids[this.state.index]]["word"]["spelling"]].forEach(v =>
    //     console.log(generateRandomCharArray(v, 4))
    //   );
    console.log("setPage", setPage, page, perPage, total);
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
    const hint =
      ids.length &&
      ids[this.state.index] &&
      data[ids[this.state.index]]["translation"]
        ? data[ids[this.state.index]]["translation"]
        : ids.length &&
          ids[this.state.index] &&
          data[ids[this.state.index]]["word"]
        ? data[ids[this.state.index]]["word"]["translation"]
        : null;
    const renderItem = () => {
      return spelling && !isLoading ? (
        <TestItem
          key={spelling + "_" + this.state.index}
          mode="learning"
          spelling={spelling}
          hint={hint}
          onComplete={this.handleToNext}
        />
      ) : (
        <CircularProgress className={classes.progress} />
      );
    };
    const { swipeToLeft } = this.state;
    return (
      <ErrorBoundary>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <IconButton onClick={this.handleToPrev}>
              <ArrowLeft />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={8}
            container
            justify="center"
            alignItems="center"
            style={{ position: "relative", height: 400 }}
          >
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
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <IconButton onClick={this.handleToNext}>
              <ArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </ErrorBoundary>
    );
  }
}
export const WordTestsWithRouter = withStyles(styles)(withRouter(TestItems));
// export const WordTests = props => (
//   <List {...props} perPage={5}>
//     <WordTestsWithRouter />
//   </List>
// );

export const WordTestList = ({ dispatch, ...props }) => (
  <List {...props} pagination={null}>
    <WordTestsWithRouter />
  </List>
);
const stateToMap = state => ({
  filter: { bookId: state.currentWordbook }
});

export default connect(stateToMap)(WordTestList);
