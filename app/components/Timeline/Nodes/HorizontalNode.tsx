import CustomSwitch from "@components/Switch/CustomSwitch";
import CustomSwitchFlow from "@components/Switch/CustomSwitchFlow";
import { MyTheme } from "@customTypes/styling";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import FileViewer from "react-file-viewer";

import React, { memo, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import useStyles from "../timeline.jss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar, { genConfig } from "react-nice-avatar";
import MaterialAvatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import classnames from "classnames";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";
import Filter4Icon from "@material-ui/icons/Filter4";
import Filter5Icon from "@material-ui/icons/Filter5";
import Filter6Icon from "@material-ui/icons/Filter6";
import Filter7Icon from "@material-ui/icons/Filter7";
import Filter8Icon from "@material-ui/icons/Filter8";
import Filter9Icon from "@material-ui/icons/Filter9";
import Filter9PlusIcon from "@material-ui/icons/Filter9Plus";

const moreDocsMapping = [
  Filter1Icon,
  Filter2Icon,
  Filter3Icon,
  Filter4Icon,
  Filter5Icon,
  Filter6Icon,
  Filter7Icon,
  Filter8Icon,
  Filter9Icon,
  Filter9PlusIcon
];

const config = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

const config2 = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

const config3 = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

export default memo(({ data, isConnectable }: NodeProps) => {
  const classes = useStyles();

  const [extract, setExtract] = useState(true);
  const handleExtract = () => {
    setExtract(prevVal => !prevVal);
  };

  const people = ["test", "test2", "test3", "test4", "test5", "test6", "test"];
  const documents = [
    "test",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test"
  ];

  return (
    <div
      className="nodrag"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Paper
        className={classnames("nodrag", classes.horizontalNodeOffTimeLine)}
      >
        <div
          style={{
            margin: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CustomSwitchFlow
              checked={extract}
              name="includeInExtract"
              onChange={handleExtract}
            />
            <Typography style={{ fontSize: 6, color: "gray", marginLeft: 3 }}>
              Ekstrakt
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography style={{ fontSize: 6, color: "gray", marginRight: 3 }}>
              {data.label}
            </Typography>
            <Tooltip arrow title="Mere" placement="top">
              <IconButton size="small">
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <Divider />
        <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
          Titel
        </Typography>
        <Typography style={{ marginLeft: 10, fontSize: 6 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque sequi
          sit doloremque corrupti explicabo perferendis iste, omnis facilis,
          tenetur molestias culpa ratione sunt doloribus aut? Consequuntur dicta
          illum dolore eveniet!
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 10,
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {people.map((person, index) => {
              if (index === 3) {
                return (
                  <Tooltip
                    arrow
                    title={people.slice(3).join(", ")}
                    placement="top"
                  >
                    <div style={{ cursor: "pointer", margin: "0 2px" }}>
                      <MaterialAvatar
                        style={{ width: 20, height: 20, fontSize: 8 }}
                      >
                        {`${people.length - 3}+`}
                      </MaterialAvatar>
                    </div>
                  </Tooltip>
                );
              }

              if (index > 3) {
                return null;
              }

              return (
                <Tooltip arrow title={person} placement="top">
                  <div style={{ cursor: "pointer", margin: "0 2px" }}>
                    <Avatar style={{ width: 20, height: 20 }} {...config} />
                  </div>
                </Tooltip>
              );
            })}
          </div>

          <div>
            <IconButton size="small">
              <PersonAddIcon style={{ color: "gray" }} />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 10,
            justifyContent: "space-between"
          }}
        >
          <div>
            {documents.map((document, index) => {
              if (index === 3) {
                const MoreDocs = moreDocsMapping[documents.length - 4];

                return (
                  <Tooltip
                    arrow
                    title={documents.slice(3).join(", ")}
                    placement="top"
                  >
                    <IconButton size="small">
                      <MoreDocs />
                    </IconButton>
                  </Tooltip>
                );
              }

              if (index > 3) {
                return null;
              }

              return (
                <Tooltip arrow title={document} placement="top">
                  <IconButton size="small">
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              );
            })}
          </div>
          <div>
            <IconButton size="small">
              <NoteAddIcon style={{ color: "gray" }} />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            display: "flex",
            alignItems: "center"
          }}
        >
          <Tooltip arrow title="Mere" placement="top">
            <div
              style={{
                backgroundColor: "pink",
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 1
              }}
            />
          </Tooltip>
          <Tooltip arrow title="Mere" placement="top">
            <div
              style={{
                backgroundColor: "red",
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 1
              }}
            />
          </Tooltip>
          <Tooltip arrow title="Mere" placement="top">
            <div
              style={{
                backgroundColor: "blue",
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 1
              }}
            />
          </Tooltip>
          <Tooltip arrow title="Mere" placement="top">
            <div
              style={{
                backgroundColor: "yellow",
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 1
              }}
            />
          </Tooltip>
          <IconButton size="small">
            <AddCircleIcon style={{ fontSize: 10, color: "gray" }} />
          </IconButton>
        </div>
      </Paper>

      <Paper className={classes.horizontalNodeOnTimeLine}>
        <Typography
          variant="subtitle1"
          className={classes.horizontalDate}
          id="nodeLabel"
        >
          {data.label}
        </Typography>
        <Handle
          type="target"
          style={{ left: 1 }}
          position={Position.Left}
          className={classes.horizontalHandle}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          style={{ right: 1 }}
          className={classes.horizontalHandle}
        />
      </Paper>
    </div>
  );
});
