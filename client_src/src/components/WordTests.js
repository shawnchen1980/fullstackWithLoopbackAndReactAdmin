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
import posed, { PoseGroup } from "react-pose";
import { connect } from "react-redux";
const Box = posed.div({
  inFromRight1: {
    opacity: 1,
    x: 0,
    transition: {
      x: ({ from, to }) => ({
        type: "keyframes",
        values: [from, -1000, 1000, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      }),
      opacity: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 0, 0, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      })
    }
  },
  inFromRight2: {
    opacity: 1,
    x: 0,
    transition: {
      x: ({ from, to }) => ({
        type: "keyframes",
        values: [from, -1000, 1000, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      }),
      opacity: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 0, 0, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      })
    }
  },
  inFromLeft1: {
    opacity: 1,
    x: 0,
    transition: {
      x: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 1000, -1000, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      }),
      opacity: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 0, 0, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      })
    }
  },
  inFromLeft2: {
    opacity: 1,
    x: 0,
    transition: {
      x: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 1000, -1000, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      }),
      opacity: ({ from, to }) => ({
        type: "keyframes",
        values: [from, 0, 0, to],
        times: [0, 0.5, 0.51, 1],
        duration: 1000
      })
    }
  }
});

class TestItems extends Component {
  state = { index: 0, swipeToLeft: true, myPose: "inFromRight1" };
  switchToL = () => {
    this.setState({
      swipeToLeft: true,
      myPose:
        this.state.myPose === "inFromRight1" ? "inFromRight2" : "inFromRight1"
    });
  };
  switchToR = () => {
    this.setState({
      swipeToLeft: false,
      myPose:
        this.state.myPose === "inFromLeft1" ? "inFromLeft2" : "inFromLeft1"
    });
  };
  handleToPrev = () => {
    const { ids, data, basePath } = this.props;
    this.setState(prevState => {
      return !!prevState.index ? { index: prevState.index - 1 } : prevState;
    });
    this.switchToR();
  };
  handleToNext = () => {
    const { ids, data, basePath } = this.props;
    this.setState(prevState => {
      return prevState.index < ids.length - 1
        ? { index: prevState.index + 1 }
        : prevState;
    });
    this.switchToL();
  };
  render() {
    const { ids, data, basePath, location } = this.props;
    console.log(ids, "data", data, location);
    if (ids.length)
      [...data[ids[this.state.index]]["word"]["spelling"]].forEach(v =>
        console.log(generateRandomCharArray(v, 4))
      );

    return (
      <ErrorBoundary>
        <div>
          <button onClick={this.handleToPrev}>prev</button>
          <button onClick={this.handleToNext}>next</button>

          <Box pose={this.state.myPose}>
            {ids.length ? (
              <TestItem
                key={this.state.index}
                mode="learning"
                spelling={data[ids[this.state.index]]["word"]["spelling"]}
                onComplete={this.handleToNext}
              />
            ) : null}
          </Box>
        </div>
      </ErrorBoundary>
    );
  }
}
const WordTestsWithRouter = withRouter(TestItems);
export const WordTests = props => (
  <List {...props} perPage={5}>
    <WordTestsWithRouter />
  </List>
);

const WordTestList = props => (
  <List {...props}>
    <TestItems />
  </List>
);
const stateToMap = state => ({
  filter: { bookId: state.currentWordbook }
});

export default connect(stateToMap)(WordTestList);
