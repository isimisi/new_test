/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, { useEffect, useState, useRef } from "react";
import { useHistory, Prompt } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Lottie from "lottie-react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";
import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";

import Loader from "@components/Loading/LongLoader";
import {
  analyseOutput,
  saveAnalysis,
  closeNotifAction,
  revisionHistory,
  analysisTextChange,
  analysisPowerpoint
} from "./reducers/workspaceActions";
import notFound from "@lotties/racoon/noContent.json";
import { MyTheme } from "@customTypes/styling";
import Notification from "@components/Notification/Notification";
import MiniFlow from "@components/Workspace/Analysis/MiniFlow";

import SidePanel from "@components/Workspace/Analysis/SidePanel";


const useStyles = makeStyles((theme: MyTheme) => ({
  root: {
    flexGrow: 1,
    minHeight: 400,
    zIndex: 1,
    position: "relative",
    backgroundColor: "white",
    overflow: "hidden",
    display: "flex",
    marginBottom: theme.spacing(3),
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light,

  },
  drawerPaper: {
    position: "relative",
    width: "100%",
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  hoverItem: { transition: "1s" },
  drawerContent: {
    padding: 10,
  },
  errorWrap: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: "50%",
    width: 700,
    height: 700,
    [theme.breakpoints.down("sm")]: {
      width: 400,
      height: 400,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    margin: `${theme.spacing(3)}px auto`,
    "& h5": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem",
      },
    },
  },
  lottie: {
    borderRadius: "50%",
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down("sm")]: {
      width: 400 / 1.5,
      height: 400 / 1.5,
    },
  },
  container: { display: "flex",
    overflowY: "scroll",
    height: "90vh",
    alignSelf: "flex-start",

  },
}));

const WorkspaceAnalysis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split("/").pop();
  const outputs = useSelector((state) => state[reducer].get("outputs")).toJS();
  const loading = useSelector((state) => state[reducer].get("loading"));
  const revisionHistoryList = useSelector((state) =>
    state[reducer].get("revisionHistory")
  ).toJS();
  const { user } = useAuth0();

  const messageNotif = useSelector((state) => state[reducer].get("message"));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeRevision, setActiveRevision] = useState({});
  const { t } = useTranslation();

  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;

  useEffect(() => {
    dispatch(analyseOutput(user as User, id as string));
    dispatch(revisionHistory(user as User, id as string));
  }, [user]);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
  };

  const handleQuillChange = (v, index) => {
    dispatch(analysisTextChange(v, index));
  };

  const removePositionFromElements = (elements) =>
    [...elements].map((x) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, ...rest } = x;
      return { ...rest };
    });

  const handleDrawer = () => {
    setOpen((prevVal) => {
      outputs.forEach((x, i) => {
        const revisionHistoryItem =
          revisionHistoryList[
            JSON.stringify(removePositionFromElements(x.elements))
          ];

        if (revisionHistoryItem) {
          const firstRevisionIndex = revisionHistoryItem.findIndex(
            (y) => y.revision_number === 0
          );
          const lastRevisionIndex = revisionHistoryItem.findIndex((r, j) => {
            if (
              activeRevision[
                JSON.stringify(removePositionFromElements(x.elements))
              ]
            ) {
              return (
                r.id ===
                activeRevision[
                  JSON.stringify(removePositionFromElements(x.elements))
                ]
              );
            }

            return firstRevisionIndex === 0
              ? j === revisionHistoryItem.length - 1
              : j === 0;
          });
          const revision = revisionHistoryItem[lastRevisionIndex];

          handleQuillChange(revision[prevVal ? "output" : "htmlDiffString"], i);
        }
      });

      return !prevVal;
    });
  };

  const downloadFile = (label, file) => {
    const data = Uint8Array.from(file.Body.data);
    const content = new Blob([data.buffer], { type: file.ContentType });

    const encodedUri = window.URL.createObjectURL(content);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", label);

    link.click();
  };

  const save = () => {
    if (open) {
      handleDrawer();
    }

    outputs.forEach((output) => {
      dispatch(
        saveAnalysis(user as User, id as string, output.action.output, JSON.stringify(output.elements))
      );
    });
  };

  const handleSelectRevision = (key, value, index) => {
    const currRevisoion = { ...activeRevision };
    currRevisoion[key] = value;
    setActiveRevision(currRevisoion);

    const revisionString = revisionHistoryList[key].find((x) => x.id === value)
      .htmlDiffString;

    handleQuillChange(revisionString, index);
  };


  const itemsRef = useRef([]);


  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, outputs.length);
  }, [outputs]);

  const [readyForDownload, setReadyForDownload] = useState(false);
  const [loadingPp, setLoadingPp] = useState(false);

  const handleImagesForPp = () => {
    setLoadingPp(true);
    itemsRef.current.forEach((item) => {
      // @ts-ignore
      item.handleImage();
    });
    setReadyForDownload(true);
    setTimeout(() => {
      setLoadingPp(false);
    }, 1000);
  };

  const handlePp = () => {
    setReadyForDownload(false);
    // @ts-ignore
    const param = {
      data: []
    };
    for (let index = 0; index < itemsRef.current.length; index++) {
      const element = itemsRef.current[index];
      // @ts-ignore
      const obj = { html: element.html, body: element.image };
      // @ts-ignore
      param.data.push(obj);
    }

    dispatch(analysisPowerpoint(user as User, param));
  };

  useEffect(() => {
    if (readyForDownload) {
      toast.info("Download powerpoint", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        toastId: Math.random() * 100 + 10,
        onClick: handlePp,
        onClose: () => setReadyForDownload(false)
      });
    }
  }, [readyForDownload]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      {outputs.length === 0 && (
        <div className={classes.errorWrap}>
          <Lottie animationData={notFound} className={classes.lottie} />
          <Typography variant="h6">
            {t("workspace.analysis.nothing")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={history.goBack}
          >
            {t("404.btn_return_to_workspace")}
          </Button>
        </div>
      )}
      <div className={classes.container}>
        <div>
          {outputs.map((output, index) => (
            <Grid container className={classes.root}>
              <Grid
                item
                xs={open && output.action.output_type !== "upload" ? 5 : 6}
                style={{ marginBottom: 40, paddingLeft: 20, paddingTop: 20 }}
              >
                <Typography variant="h6">{output.conditionLabel}</Typography>
                <MiniFlow
                  html={output.action.output}
                  elements={output.elements}
                  // @ts-ignore
                  ref={el => itemsRef.current[index] = el}
                />
              </Grid>
              <Grid
                item
                xs={open && output.action.output_type !== "upload" ? 5 : 6}
                style={{ paddingTop: 20 }}
              >
                <Typography variant="h6">{output.action.label}</Typography>
                {output.action.output_type === "upload" ? (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => downloadFile(output.conditionLabel, output.action.output)}
                    >
                  Åben fil
                    </Button>
                  </div>
                ) : (
                  <ReactQuill
                    placeholder="Note"
                    theme="bubble"
                    value={output.action.output}
                    onChange={(v) => handleQuillChange(v, index)}
                    modules={modules}
                  />
                )}
              </Grid>
              {open && (
                <Grid
                  item
                  xs={open && output.action.output_type !== "upload" ? 2 : false}
                  style={{
                    display: output.action.output_type === "upload" ? "none" : undefined,
                  }}
                >
                  <Hidden smDown>
                    <Drawer
                      variant="permanent"
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      style={{ height: "100%" }}
                    >
                      <List style={{ padding: 0 }}>
                        {revisionHistoryList[
                          JSON.stringify(
                            removePositionFromElements(output.elements)
                          )
                        ]
                          ?.reverse()
                          .map((list, revisionIndex) => (
                            <ListItem
                              button
                              selected={
                                activeRevision[
                                  JSON.stringify(
                                    removePositionFromElements(output.elements)
                                  )
                                ]
                                  ? activeRevision[
                                    JSON.stringify(
                                      removePositionFromElements(output.elements)
                                    )
                                  ] === list.id
                                  : revisionIndex === 0
                              }
                              key={list.id.toString()}
                              onClick={() =>
                                handleSelectRevision(
                                  JSON.stringify(
                                    removePositionFromElements(output.elements)
                                  ),
                                  list.id,
                                  index
                                )
                              }
                            >
                              <ListItemText
                                primaryTypographyProps={{
                                  variant: "body1",
                                  style: { fontSize: 12 },
                                }}
                                primary={list.created_at}
                                secondary={
                                  list.user.firstName + " " + list.user.lastName
                                }
                              />
                            </ListItem>
                          ))}
                      </List>
                    </Drawer>
                  </Hidden>
                </Grid>
              )}
            </Grid>
          ))}
        </div>
        {outputs.length === 0 ? null : <SidePanel handleImagesForPp={handleImagesForPp} handleVersions={handleDrawer} save={save} />}
      </div>
      <Prompt
        when
        message={() =>
          "Er du sikker på du vil forlade denne side uden at gemme dine ændringer?"
        }
      />
    </>
  );
};

export default WorkspaceAnalysis;
