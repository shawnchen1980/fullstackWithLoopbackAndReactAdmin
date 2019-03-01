import React from "react";
import Button from "@material-ui/core/Button";
import { browseWordbook } from "../features/Wordbook/action";
import { connect } from "react-redux";
const BrowseWordbookButton = ({ browseWordbook, record, basePath }) => (
  <Button
    color="primary"
    onClick={() => {
      console.log(record);
      console.log(browseWordbook);
      localStorage.setItem("api_url", `wordbooks/${record.id}/words`);
      //   console.log(actions);
      browseWordbook(record, basePath);
    }}
  >
    查看词条
  </Button>
);

export default connect(
  null,
  { browseWordbook }
)(BrowseWordbookButton);
