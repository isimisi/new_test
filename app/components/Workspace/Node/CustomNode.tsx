/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { memo, useMemo, useCallback, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Handle, Position } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCompanyData } from "../../../containers/Pages/Workspaces/reducers/workspaceActions";

import square from "./square.svg";
import triangle from "./triangle.svg";
import circle from "./circle.svg";
import person from "./person.svg";
import { useAuth0, User } from "@auth0/auth0-react";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { MyTheme } from "@customTypes/styling";

const CustomNode = ({ data }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme<MyTheme>();
  const history = useHistory();
  const handleVisability = useAppSelector(state =>
    state.workspace.get("handleVisability")
  );
  const signed = useAppSelector(state => state.workspace.get("signed"));
  const loading = useAppSelector(state => state.workspace.get("loading"));
  const [showContext, setShowContext] = useState(false);
  const showHandles =
    !history.location.pathname.includes("analysis") &&
    handleVisability &&
    !signed;
  const showHover = !history.location.pathname.includes("public");
  const user = useAuth0().user as User;
  const [innerShowHandles, setInnerShowHandles] = useState(false);

  const getSVG = useCallback(figur => {
    switch (figur) {
      case "triangle":
        return triangle;
      case "square":
        return square;
      case "circle":
        return circle;
      case "person":
        return person;
      default:
        return square;
    }
  }, []);

  const nodeStyle = {
    border: "1px solid",
    borderRadius: theme.rounded.small,
    display: "flex",
    padding: 12,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: data.backgroundColor ? data.backgroundColor : "#ffffff",
    borderColor: data.borderColor ? data.borderColor : "#000000"
  };

  const inlineWrap = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  };

  const iconStyle = {
    height: 10,
    marginRight: 7
  };

  const handleStyle = useMemo(
    () => ({
      height: showHandles && innerShowHandles ? 8 : 0,
      width: showHandles && innerShowHandles ? 8 : 0,
      backgroundColor: showHandles && innerShowHandles ? "black" : "white"
    }),
    [handleVisability, signed, innerShowHandles]
  );

  const handleStyleSideBottom = useMemo(
    () => ({
      height: showHandles && innerShowHandles ? 8 : 0,
      width: showHandles && innerShowHandles ? 8 : 0,
      backgroundColor: showHandles && innerShowHandles ? "black" : "white",

      top: "70%"
    }),
    [handleVisability, signed, innerShowHandles]
  );

  const handleStyleSideTop = useMemo(
    () => ({
      height: showHandles && innerShowHandles ? 8 : 0,

      width: showHandles && innerShowHandles ? 8 : 0,
      backgroundColor: showHandles && innerShowHandles ? "black" : "white",
      top: "30%"
    }),
    [handleVisability, signed, innerShowHandles]
  );

  const header = useMemo(
    () => ({
      fontSize: 10
    }),
    []
  );

  const attr = useMemo(
    () => ({
      fontSize: 6
    }),
    []
  );

  const handelShowContext = useCallback(() => {
    setShowContext(true);
    setInnerShowHandles(true);
  }, []);
  const handelHideContext = useCallback(() => {
    setShowContext(false);
    setInnerShowHandles(false);
  }, []);

  return (
    <div
      onMouseOver={handelShowContext}
      onFocus={handelShowContext}
      onMouseLeave={handelHideContext}
      onBlur={handelHideContext}
      // @ts-ignore
      style={nodeStyle}
    >
      <Handle
        style={handleStyle}
        type="source"
        id="top"
        position={Position.Top}
      />
      <Handle
        style={handleStyleSideTop}
        type="source"
        id="leftTop"
        position={Position.Left}
      />
      <Handle
        style={handleStyleSideBottom}
        type="source"
        id="leftBottom"
        position={Position.Left}
      />
      <Handle
        style={handleStyleSideBottom}
        type="source"
        id="rightBottom"
        position={Position.Right}
      />
      <Handle
        style={handleStyleSideTop}
        type="source"
        id="rightTop"
        position={Position.Right}
      />
      <Handle
        style={handleStyle}
        type="source"
        id="bottom"
        position={Position.Bottom}
      />

      <div
        // @ts-ignore
        style={inlineWrap}
      >
        {data.figur && (
          <img src={getSVG(data.figur)} alt={data.figur} style={iconStyle} />
        )}
        <Typography variant="subtitle1" style={header} id="nodeLabel">
          {data.displayName || data.label}
        </Typography>
      </div>
      {data.conditionValues &&
        data.conditionValues.map(cv => (
          <Typography variant="body2" style={attr} key={cv.attribut.label}>
            {cv.attribut.label}
            {' '}
            {cv.comparison_type}
            {' '}
            {cv.comparison_value}
          </Typography>
        ))}
      {data.attributes &&
        data.attributes
          .filter(cv => cv.show)
          .map(cv => (
            <Typography variant="body2" style={attr} key={cv.label}>
              {cv.label}
              {": "}
              {cv.value}
            </Typography>
          ))}
      <div
        onMouseOver={handelShowContext}
        onFocus={handelShowContext}
        onMouseLeave={handelHideContext}
        onBlur={handelHideContext}
        className="nodrag"
        style={{
          position: "absolute",
          width: "calc(100% + 50px)",
          height: "calc(100% + 50px)",
          zIndex: -1,
          cursor: "default"
        }}
      >
        {showContext && showHover && (
          <div
            style={{
              position: "absolute",
              right: 1,
              top: 5,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Tooltip title="Mere">
              <IconButton
                color="primary"
                aria-label="mere"
                size="small"
                style={{
                  borderRadius: 5,
                  marginTop: 25,
                  backgroundColor: theme.palette.primary.main
                }}
                onClick={() => {
                  const node = document.querySelector(`[data-id="${data.id}"]`);
                  if (node) {
                    const event = new MouseEvent("contextmenu", {
                      bubbles: true,
                      cancelable: false,
                      view: window,
                      button: 2,
                      buttons: 0,
                      clientX: node.getBoundingClientRect().x + 250,
                      clientY: node.getBoundingClientRect().y
                    });
                    node.dispatchEvent(event);
                  }
                }}
              >
                <MoreVertIcon style={{ fontSize: 8, color: "white" }} />
              </IconButton>
            </Tooltip>
            {data.unitNumber && (
              <Tooltip title="Selskabsinformation">
                <IconButton
                  color="primary"
                  aria-label="Info om selskabet"
                  size="small"
                  style={{
                    borderRadius: 5,
                    backgroundColor: theme.palette.primary.main,
                    marginTop: 5
                  }}
                  onClick={() => {
                    dispatch(getCompanyData(user, data.id));
                  }}
                >
                  {loading ? (
                    <CircularProgress size={8} style={{ color: "white" }} />
                  ) : (
                    <InfoIcon style={{ fontSize: 8, color: "white" }} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CustomNode);
