import React from "react";
import Button from "@material-ui/core/Button";
import { createPractice } from "../features/Practice/action";
import { connect } from "react-redux";
const CreatePracticeButton = ({ createPractice, record, basePath }) => (
  <Button
    color="primary"
    onClick={() => {
      console.log(record);
      console.log(createPractice);
      //   console.log(actions);
      createPractice(record, basePath);
    }}
  >
    创建练习
  </Button>
);

export default connect(
  null,
  { createPractice }
)(CreatePracticeButton);
