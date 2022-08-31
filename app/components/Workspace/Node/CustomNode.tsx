/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { memo, useMemo, useCallback, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Handle, Position } from "react-flow-renderer";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import square from "./square.svg";
import triangle from "./triangle.svg";
import circle from "./circle.svg";
import person from "./person.svg";
import ErrorIcon from "@material-ui/icons/Error";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { MyTheme } from "@customTypes/styling";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";
import { deltaE } from "@api/ui/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfoIcon from "@material-ui/icons/Info";
import { useAuth0, User } from "@auth0/auth0-react";
import { getCompanyData } from "@pages/Workspaces/reducers/workspaceActions";

export const getSVG = (figur) => {
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
};

function CustomNode({ data }) {
  const theme = useTheme<MyTheme>();
  const history = useHistory();
  const { t } = useTranslation();
  const handleVisability = useAppSelector((state) =>
    state.workspace.get("handleVisability")
  );
  const dispatch = useAppDispatch();

  const signed = useAppSelector((state) => state.workspace.get("signed"));
  const loading = useAppSelector((state) => state.workspace.get("loading"));
  const showHover = history.location.pathname.includes("workspace");
  const _public = history.location.pathname.includes("public");
  const user = useAuth0().user as User;

  const [showContext, setShowContext] = useState(false);

  const showHandles =
    !history.location.pathname.includes("analysis") &&
    handleVisability &&
    !signed;

  const [innerShowHandles, setInnerShowHandles] = useState(false);

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
      fontSize: 10,
      color: data.labelColor || "#000"
    }),
    [data.labelColor]
  );

  const attr = useMemo(
    () => ({
      fontSize: 6
    }),
    []
  );

  const handelShowContext = useCallback(() => {
    setInnerShowHandles(true);
    setShowContext(true);
  }, []);
  const handelHideContext = useCallback(() => {
    setInnerShowHandles(false);
    setShowContext(false);
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
        {!data.label && (
          <Tooltip
            arrow
            title={`${t("workspaces.node.no_label")}`}
            placement="top"
          >
            <ErrorIcon
              data-html2canvas-ignore="true"
              style={{
                color: data.backgroundColor
                  ? deltaE("rgb(255, 220, 121, 1)", data.backgroundColor) < 30
                    ? "black"
                    : "rgb(255,220,121)"
                  : "black",
                fontSize: 10,
                position: "absolute",
                top: 2,
                right: 2,
                cursor: "auto",
                zIndex: 110
              }}
            />
          </Tooltip>
        )}
      </div>
      {data.conditionValues &&
        data.conditionValues.map((cv) => (
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
          .filter((cv) => cv.show)
          .map((cv) => (
            <Typography variant="body2" style={attr} key={cv.label}>
              {cv.label}
              {": "}
              {cv.value}
            </Typography>
          ))}
      {data.unitNumber && showContext && showHover && !_public && (
        <Tooltip title="Selskabsinformation">
          <IconButton
            aria-label="Info om selskabet"
            size="small"
            style={{
              borderRadius: 5,
              backgroundColor: theme.palette.primary.main,
              padding: 0,
              position: "absolute",
              top: 3,
              right: 3
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
      <div
        onMouseOver={handelShowContext}
        onFocus={handelShowContext}
        onMouseLeave={handelHideContext}
        onBlur={handelHideContext}
        className="nodrag"
        style={{
          position: "absolute",
          width: "calc(100% + 20px)",
          height: "calc(100% + 20px)",
          zIndex: -1,
          cursor: "default",

          borderRadius: 10
        }}
      />
    </div>
  );
}

export default memo(CustomNode);
