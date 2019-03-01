import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connectedInput } from "./MyArrayInput";
import { Field } from "redux-form";

import {
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  FormDataConsumer
} from "react-admin";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 50
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  openNext = () => {
    this.setState({
      expanded: "panel2"
    });
  };

  render() {
    const { classes, source } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>快捷输入</Typography>
            <Typography className={classes.secondaryHeading}>
              利用文本框快速输入大量单词，单词之间用分隔符分割，输入完成后按导入按钮
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Field
              name={source}
              component={connectedInput}
              openNext={this.openNext}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>输入校验</Typography>
            <Typography className={classes.secondaryHeading}>
              正式导入前进行数据检查，无误后保存
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ArrayInput source={source}>
              <SimpleFormIterator>
                <TextInput source="spelling" />
              </SimpleFormIterator>
            </ArrayInput>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
