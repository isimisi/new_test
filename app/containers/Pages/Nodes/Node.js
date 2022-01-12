import React, { useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { NodeDemo, NodeStyling, NodeForm, Notification } from "@components";
import { useHistory } from "react-router-dom";
import { getId } from "@api/constants";
import {
  putNode,
  showNode,
  getAttributeDropDown,
  getGroupDropDown,
  closeNotifAction,
} from "./reducers/nodeActions";
import { reducer, generateNodeStyle } from "./constants";

const Node = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector((state) => state[reducer].get("message"));
  const history = useHistory();
  const theme = useTheme();
  const id = getId(history);
  const title = useSelector((state) => state[reducer].get("title"));
  const description = useSelector((state) => state[reducer].get("description"));
  const attributes = useSelector((state) =>
    state[reducer].get("attributes")
  ).toJS();
  const deletedAttributes = useSelector((state) =>
    state[reducer].get("deletedAttributes")
  ).toJS();
  const group = useSelector((state) => state[reducer].get("group"));
  const attributesDropDownOptions = useSelector((state) =>
    state[reducer].get("attributesDropDownOptions")
  ).toJS();
  const groupsDropDownOptions = useSelector((state) =>
    state[reducer].get("groupsDropDownOptions")
  ).toJS();

  // generate style object
  const size = useSelector((state) => state[reducer].get("size"));
  const backgroundColor = useSelector((state) =>
    state[reducer].get("backgroundColor")
  );
  const borderColor = useSelector((state) => state[reducer].get("borderColor"));

  const onSave = () => {
    const nodeStyle = generateNodeStyle(
      size,
      backgroundColor.toJS(),
      borderColor.toJS(),
      theme
    );
    dispatch(
      putNode(
        id,
        title,
        description,
        JSON.stringify(attributes),
        JSON.stringify(deletedAttributes),
        group,
        nodeStyle,
        history
      )
    );
  };

  useEffect(() => {
    dispatch(showNode(id));
    if (group) {
      dispatch(getAttributeDropDown(group));
    }

    dispatch(getGroupDropDown());
  }, []);
  return (
    <div>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <Grid container spacing={1}>
        <Grid item md={6}>
          <NodeForm
            title={title}
            description={description}
            attributes={attributes}
            group={group}
            attributesDropDownOptions={attributesDropDownOptions}
            groupsDropDownOptions={groupsDropDownOptions}
          />
        </Grid>
        <Grid item md={6}>
          <NodeDemo
            title={title}
            description={description}
            attributes={attributes}
            size={size}
            backgroundColorSelector={backgroundColor}
            borderColorSelector={borderColor}
          />
          <NodeStyling
            size={size}
            backgroundColor={backgroundColor.toJS()}
            borderColor={borderColor.toJS()}
          />
        </Grid>
      </Grid>
      <Tooltip title="Save">
        <Fab
          variant="extended"
          color="primary"
          style={{
            position: "fixed",
            bottom: 30,
            right: 50,
            zIndex: 100,
          }}
          onClick={onSave}
        >
          Gem
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Node;
