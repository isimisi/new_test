/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import { authHeader, baseUrl, getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Notification from "@components/Notification/Notification";
import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";
import useStyles from "./timeline-jss";
import axios from "axios";

import ShareModal from "@components/Flow/Share/ShareModal";
import {
  addGroup,
  changeHandleVisability,
  changeTags,
  closeNotifAction,
  createElementChange,
  descriptionChange,
  labelChange,
  putTimeline,
  shareOrgChange,
  showTimeline,
  importEmails,
  timelineElementPersonChange,
  timelineElementDocumentChange,
  saveElement,
  changeTimelineNodeKey,
  setTimelineNode,
  putElement,
  deleteElements,
  openEmailChange,
  changeView,
  setIsUpdating,
  goThroughSplitChange,
  clearSplitting,
  validateEmailsClose
} from "./reducers/timelineActions";
import ReactFlow, { isNode, OnLoadParams } from "react-flow-renderer";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { getPlanId } from "@helpers/userInfo";
import Collaboration from "@components/Flow/Actions/Collaborations";
import Meta from "@components/Flow/Actions/Meta";
import { Person as TPerson } from "@customTypes/reducers/person";
import { Document as TDocument } from "@customTypes/reducers/document";
import Controls from "@components/Flow/Actions/Controls";
import { useTheme } from "@material-ui/core/styles";
import Loader from "@components/Loading/LongLoader";
import { handleExport } from "@helpers/export/handleExport";
import {
  getGroupDropDown,
  workspacePowerpoint
} from "../Workspaces/reducers/workspaceActions";
import {
  openMenuAction,
  closeMenuAction,
  toggleAction
} from "@redux/actions/uiActions";
import Views from "@components/Flow/Actions/Views";
import Drawer from "@material-ui/core/Drawer";
import classnames from "classnames";
import HorizontalNode from "@components/Timeline/Nodes/HorizontalNode";
import AddItemNode from "@components/Timeline/Nodes/AddItemNode";
import EdgeWithButton from "@components/Timeline/Edges/EdgeWithButton";
import useWindowDimensions from "@hooks/useWindowDiemensions";
import "./timeline.css";

import WorkspaceMeta from "@components/Workspace/Modals/WorkspaceMeta";
import CreateElement from "@components/Timeline/Modals/CreateElement";
import {
  changePerson,
  getPersonDropDown,
  showPerson
} from "../Persons/reducers/personActions";
import Person from "@components/Timeline/Modals/Person";
import Document from "@components/Timeline/Modals/Document";
import {
  changeDocument,
  getDocumentDropDown,
  showDocument
} from "../Documents/reducers/documentActions";
import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import Email from "@components/Timeline/Modals/Email";
import VerticalNode from "@components/Timeline/Nodes/VerticalNode";
import Content from "@components/Timeline/Drawer/Content";
import getDrawerWidth from "@hooks/timeline/drawerWidth";
import ImportEmails from "@components/Timeline/Modals/ImportEmails";
import GoThroughSplit from "@components/Timeline/Modals/GoThroughSplit";
import ValidateEmails from "@components/Timeline/Modals/ValidateEmails";

const nodeTypes = {
  horizontal: HorizontalNode,
  vertical: VerticalNode,
  addItem: AddItemNode
};

const edgeTypes = {
  custom: EdgeWithButton
};

function Timeline() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const elements = useAppSelector((state) =>
    state[reducer].get("elements")
  ).toJS();

  const messageNotif = useAppSelector((state) => state[reducer].get("message"));
  const createElementOpen = useAppSelector((state) =>
    state[reducer].get("createElementOpen")
  );
  const goThroughSplitOpen = useAppSelector((state) =>
    state[reducer].get("goThroughSplitOpen")
  );

  const personOptions = useAppSelector((state) =>
    state.person.get("personOptions")
  ).toJS();
  const documentOptions = useAppSelector((state) =>
    state.document.get("documentOptions")
  ).toJS();
  const timelineNode = useAppSelector((state) =>
    state[reducer].get("timelineNode")
  );
  const view = useAppSelector((state) => state[reducer].get("view"));
  const currSplittingNodeRefference = useAppSelector((state) =>
    state[reducer].get("currSplittingNodeRefference")
  );

  const history = useHistory();
  const id = getId(history) as string;
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  // refs
  const reactFlowContainer = useRef(null);

  // state
  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [elementPersons, setElementPersons] = useState<TPerson[]>([]);
  const [elementDocuments, setElementDocuments] = useState<TDocument[]>([]);

  const changeTimelineNode = (
    attr: keyof TimelineNode,
    val: TimelineNode[keyof TimelineNode]
  ) => {
    dispatch(changeTimelineNodeKey(val, attr));
  };

  const openPerson = () => {
    dispatch(timelineElementPersonChange(true));
  };
  const handlePersonClose = () => dispatch(timelineElementPersonChange(false));

  const handlePersonOpen = (_id: string, name?: string) => {
    dispatch(changePerson("", "initial"));
    if (_id) {
      dispatch(showPerson(user, _id, openPerson));
    } else {
      openPerson();
      if (name) {
        dispatch(changePerson(name, "name"));
      }
    }
  };

  const openDocument = () => dispatch(timelineElementDocumentChange(true));
  const handleDocumentClose = () =>
    dispatch(timelineElementDocumentChange(false));

  const handleDocumentOpen = (_id: string, title?: string) => {
    dispatch(changeDocument("", "initial"));
    if (_id) {
      dispatch(showDocument(user, _id, openDocument));
    } else {
      openDocument();
      if (title) {
        dispatch(changeDocument(title, "title"));
      }
    }
  };

  const handleOpenEmail = () => {
    dispatch(openEmailChange(true));
  };

  const handleEmailClose = () => {
    // changeTimelineNode("email", { mail: null, uri: null });
    dispatch(openEmailChange(false));
  };

  const handleCloseCreateElement = () => {
    dispatch(setTimelineNode(null));
    setElementPersons([]);
    setElementDocuments([]);
    dispatch(createElementChange(false));
  };

  const handleCloseGoThorughSplit = () => {
    dispatch(clearSplitting);
    dispatch(setTimelineNode(null));
    setElementPersons([]);
    setElementDocuments([]);
    dispatch(goThroughSplitChange(false));
  };

  const [openTableView, setOpenTableView] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (bool?: boolean) => {
    if (bool !== undefined) {
      setOpenDrawer(bool);
    } else {
      setOpenDrawer((prevVal) => !prevVal);
    }
  };

  const handleOpenTableView = (bool) => {
    if (bool !== undefined) {
      setOpenTableView(bool);
    } else {
      setOpenTableView((prevVal) => !prevVal);
    }
  };

  const [importEmailsOpen, setImportEmailsOpen] = useState(false);
  const handleOpenImportEmails = () => {
    setImportEmailsOpen(true);
  };
  const handleCloseImportEmails = () => {
    setImportEmailsOpen(false);
  };

  const [correctEmailsOpen, setCorrectEmailsOpen] = useState(false);

  const handleCloseCorectEmails = () => {
    setCorrectEmailsOpen(false);
  };

  const handleToggleCorectEmails = () => {
    if (correctEmailsOpen) {
      handleCloseCorectEmails();
    } else {
      setCorrectEmailsOpen(true);
      const badges = elements.filter(
        (e) => !e.data.date && isNode(e) && e.id !== "static-button"
      );

      dispatch(setTimelineNode(badges[0].data.id));
      dispatch(createElementChange(true));
    }
  };

  const handleVisability = useAppSelector((state) =>
    state[reducer].get("handleVisability")
  );
  const personModalOpen = useAppSelector((state) =>
    state[reducer].get("personOpen")
  );
  const documentModalOpen = useAppSelector((state) =>
    state[reducer].get("documentOpen")
  );
  const emailModalOpen = useAppSelector((state) =>
    state[reducer].get("emailOpen")
  );

  const emailsToValidate = useAppSelector((state) =>
    state.timeline.get("emailsToValidate")
  );

  const loadings = useAppSelector((state) => state[reducer].get("loadings"));
  const label = useAppSelector((state) => state[reducer].get("title"));
  const description = useAppSelector((state) =>
    state[reducer].get("description")
  );
  const group = useAppSelector((state) => state[reducer].get("group"));
  const shareOrg = useAppSelector((state) => state[reducer].get("shareOrg"));
  const tags = useAppSelector((state) =>
    state[reducer].get("specificTimelineTags")
  )?.toJS();
  const groupsDropDownOptions = useAppSelector((state) =>
    state.workspace.get("groupsDropDownOptions")
  ).toJS();
  const tagOptions = useAppSelector((state) => state.tags.get("tags")).toJS();
  const isUpdatingNode = useAppSelector((state) =>
    state[reducer].get("isUpdatingNode")
  );
  const currSplittingEmail = useAppSelector((state) =>
    state[reducer].get("currSplittingEmail")
  );
  const splitElements = useAppSelector((state) =>
    state[reducer].get("splitElements")
  );

  const handleVisabilityChange = () =>
    dispatch(changeHandleVisability(!handleVisability));
  const handleImage = (type, _stopLoading) =>
    handleExport(type, reactFlowContainer, label, _stopLoading);
  const handlePowerpoint = (_stopLoading) => {
    id &&
      dispatch(workspacePowerpoint(user, id, label, elements, _stopLoading));
  };
  const toggleSubMenu = () => dispatch(toggleAction);

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    dispatch(showTimeline(user, id as string, setMetaOpen, _reactFlowInstance));
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      // save
    }
  }, [rfInstance, user]);

  const onMouseLeave = useCallback(() => {
    onSave();
  }, [rfInstance]);

  useEffect(() => {
    dispatch(closeMenuAction);
    dispatch(getGroupDropDown(user));
    dispatch(getPersonDropDown(user));
    dispatch(getDocumentDropDown(user));

    return () => {
      dispatch(openMenuAction);
    };
  }, [user]);

  const handleChangeTags = useCallback(
    (_tags) => dispatch(changeTags(_tags)),
    []
  );
  const handleLabelChange = useCallback(
    (e) => dispatch(labelChange(e.target.value)),
    []
  );
  const handleDescriptionChange = useCallback(
    (e) => dispatch(descriptionChange(e.target.value)),
    []
  );
  const handleAddGroup = useCallback(
    (_group) => dispatch(addGroup(_group.value)),
    []
  );
  const handleShareOrg = useCallback(() => dispatch(shareOrgChange), []);

  const updateMeta = useCallback(
    () =>
      dispatch(
        putTimeline(
          user,
          id as string,
          label,
          description,
          group,
          JSON.stringify(tags),
          shareOrg,
          setMetaOpen
        )
      ),
    [label, description, group, shareOrg, tags, id, user]
  );

  const nextElWithoutDate = () => {
    const badges = elements.filter(
      (e) =>
        !e.data.date &&
        isNode(e) &&
        e.id !== "static-button" &&
        e.id !== timelineNode.get("id")
    );
    if (badges.length > 0) {
      dispatch(setTimelineNode(badges[0].data.id));
    } else {
      handleCloseCreateElement();
    }
  };

  const onSaveElement = (
    alternativeCloseFunc?: () => void,
    customSplit?: string
  ) => {
    dispatch(setTimelineNode(null));
    setElementPersons([]);
    setElementDocuments([]);
    let closeFunc = handleCloseCreateElement;
    if (correctEmailsOpen) {
      closeFunc = nextElWithoutDate;
    }

    if (alternativeCloseFunc) {
      closeFunc = alternativeCloseFunc;
    }

    if (isUpdatingNode) {
      dispatch(
        putElement(
          user,
          timelineNode,
          elementPersons,
          elementDocuments,
          closeFunc
        )
      );
    } else {
      dispatch(
        saveElement(
          user,
          id,
          timelineNode,
          currSplittingNodeRefference,
          customSplit,
          elementPersons,
          elementDocuments,
          closeFunc
        )
      );
    }
  };

  const onSavePerson = (person: TPerson) => {
    setElementPersons((prevState) => {
      const newPersons = [...prevState];
      const newPersonsFiltered = newPersons.filter((p) => {
        if (p.id) {
          return p.id !== person.id;
        }
        return p.name !== person.name;
      });

      return [...newPersonsFiltered, person];
    });

    dispatch(timelineElementPersonChange(false));
  };

  const handleSetElementDocuments = (document: TDocument) => {
    setElementDocuments((prevState) => {
      const newDocuments = [...prevState];
      const newDocumentsFiltered = newDocuments.filter((p) => {
        if (p.id) {
          return p.id !== document.id;
        }
        return p.title !== document.title;
      });

      return [...newDocumentsFiltered, document];
    });
    dispatch(timelineElementDocumentChange(false));
  };

  const onSaveDocument = async (
    document: TDocument,
    stopLoading: () => void
  ) => {
    if (document.file) {
      const url = `${baseUrl}/timelinedocuments/savefile`;
      const header = authHeader(user);
      const body = new FormData();
      body.append("file_content", document.file);
      try {
        const response = await axios.post(url, body, header);
        document.link = response.data.link;
        handleSetElementDocuments(document);
      } catch (error) {
        console.log(error);
      }
    } else {
      handleSetElementDocuments(document);
    }
    stopLoading();
  };

  const handleDelete = () => {
    dispatch(deleteElements(user, id, [timelineNode.get("id")]));
  };

  const onElementsRemove = (el) => {
    const nodes = el.filter((e) => isNode(e)).map((n) => n.id);
    dispatch(deleteElements(user, id, nodes));
  };

  const handleChangeView = (direction: "horizontal" | "vertical") => {
    dispatch(changeView(direction, elements));
    setTimeout(() => {
      rfInstance?.fitView();
    }, 200);
  };

  const { width } = useWindowDimensions();

  const { handleMouseDown, drawerWidth } = getDrawerWidth(width);

  const handleSetEdit = (bool: boolean) => {
    dispatch(setIsUpdating(bool));
  };

  const handleImportEmails = (files) => {
    dispatch(importEmails(user, id, files, handleCloseImportEmails));
  };

  // const [panToNextIndex, setPanToNextIndex] = useState<number | null>(null);

  // const handleTransform = useCallback(
  //   (transform) => {
  //     if (rfInstance) {
  //       const {
  //         position: [x, y],
  //         zoom,
  //       } = rfInstance.toObject();
  //       if (panToNextIndex !== null) {
  //         // @ts-ignore
  //         setPanToNextIndex((prevVal) => prevVal + 1);
  //       } else {
  //         setPanToNextIndex(0);
  //       }
  //       rfInstance.setTransform(transform);
  //       // animate({
  //       //   from: { x, y, zoom },
  //       //   to: transform,
  //       //   onUpdate: ({ _x, _y, _zoom }) => {
  //       //     console.log('ashbo');
  //       //     rfInstance.setTransform({ x: _x, y: _y, zoom: _zoom });
  //       //   },
  //       // });
  //     }
  //   },
  //   [rfInstance, panToNextIndex]
  // );

  const [cursor, setCursor] = useState("auto");
  const handleCursor = (_type) => setCursor(_type);

  const mouseLoading = loadings.get("mouse");

  useEffect(() => {
    if (mouseLoading) {
      handleCursor("progress");
    } else {
      handleCursor("auto");
    }
  }, [mouseLoading]);

  const handleSplit = (_timelineNode: ITimelineNode) => {
    dispatch(changeTimelineNodeKey(_timelineNode.get("email"), "email"));
    dispatch(createElementChange(false));

    dispatch(openEmailChange(true));
  };

  const handleValidateEmailsClose = () => {
    dispatch(validateEmailsClose);
  };

  return (
    <div style={{ display: "flex", cursor }}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <div
        className={classnames(classes.root, {
          [classes.contentShift]: openDrawer
        })}
        ref={reactFlowContainer}
        onMouseLeave={onMouseLeave}
      >
        <ReactFlow
          elements={elements}
          minZoom={0.3}
          maxZoom={3}
          style={{ backgroundColor: "#F3F5F8" }}
          // translateExtent={[
          //   [Number.NEGATIVE_INFINITY, -(windowHeight || 1000) / 1.5 / 3],
          //   [Number.POSITIVE_INFINITY, (windowHeight || 1000) / 1.5 / 3]
          // ]}
          onElementsRemove={onElementsRemove}
          // @ts-ignore
          nodeTypes={nodeTypes}
          // @ts-ignore
          edgeTypes={edgeTypes}
          onMove={(flowTransform) => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          onLoad={onLoad}
        >
          <div data-html2canvas-ignore="true">
            <Collaboration setShareModalOpen={setShareModalOpen} timeline />
            <Meta
              label={label}
              setMetaOpen={setMetaOpen}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handlePowerpoint}
              handleVisability={handleVisability}
              elements={elements}
              handleOpenMenu={toggleSubMenu}
              handleImage={handleImage}
              backLink="/app/timeline"
              timeline
            />
            <Views
              openTableView={handleOpenTableView}
              view={view}
              changeView={handleChangeView}
              handleOpenImportEmails={handleOpenImportEmails}
              handleToggleCorectEmails={handleToggleCorectEmails}
              openTable={openTableView}
              toggleDrawer={toggleDrawer}
              elements={elements}
            />
            <Controls
              // handleTransform={handleTransform}
              // panToNextIndex={panToNextIndex}
              currentZoom={currentZoom}
              reactFlowInstance={rfInstance}
            />
          </div>
        </ReactFlow>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openDrawer}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          className={classes.dragger}
        >
          <DragIndicatorIcon />
        </div>
        <Content
          handleEdit={handleSetEdit}
          onSave={onSaveElement}
          personOptions={personOptions}
          documentOptions={documentOptions}
          openPerson={handlePersonOpen}
          openDocument={handleDocumentOpen}
          timelineNode={timelineNode}
          changeTimelineNode={changeTimelineNode}
          handleDelete={handleDelete}
          isUpdatingNode={isUpdatingNode}
          handleOpenEmail={handleOpenEmail}
          handleDocumentOpen={handleDocumentOpen}
        />
      </Drawer>
      <WorkspaceMeta
        open={metaOpen}
        label={label}
        description={description}
        group={group}
        tagOptions={tagOptions}
        tags={tags}
        changeTags={handleChangeTags}
        labelChange={handleLabelChange}
        descriptionChange={handleDescriptionChange}
        addGroup={handleAddGroup}
        groupsDropDownOptions={groupsDropDownOptions}
        shareOrg={shareOrg}
        handleShareOrg={handleShareOrg}
        onSave={updateMeta}
        closeForm={() => setMetaOpen(false)}
      />
      <CreateElement
        open={createElementOpen}
        close={handleCloseCreateElement}
        onSave={onSaveElement}
        personOptions={personOptions}
        documentOptions={documentOptions}
        openPerson={handlePersonOpen}
        openDocument={handleDocumentOpen}
        timelineNode={timelineNode}
        changeTimelineNode={changeTimelineNode}
        handleDelete={handleDelete}
        isUpdatingNode={isUpdatingNode}
        handleSplit={handleSplit}
      />

      <GoThroughSplit
        open={goThroughSplitOpen}
        close={handleCloseGoThorughSplit}
        onSave={onSaveElement}
        personOptions={personOptions}
        documentOptions={documentOptions}
        openPerson={handlePersonOpen}
        openDocument={handleDocumentOpen}
        timelineNode={timelineNode}
        changeTimelineNode={changeTimelineNode}
        handleDelete={handleDelete}
        isUpdatingNode={isUpdatingNode}
        splitElements={splitElements}
        currSplittingEmail={currSplittingEmail}
      />

      {personModalOpen && (
        <Person
          open={personModalOpen}
          close={handlePersonClose}
          onSave={onSavePerson}
        />
      )}
      {documentModalOpen && (
        <Document
          open={documentModalOpen}
          close={handleDocumentClose}
          onSave={onSaveDocument}
        />
      )}
      {emailModalOpen && (
        <Email
          open={emailModalOpen}
          close={handleEmailClose}
          timelineNode={timelineNode}
        />
      )}
      {emailsToValidate.size > 0 && (
        <ValidateEmails
          open={emailsToValidate.size > 0}
          close={handleValidateEmailsClose}
          timeline_id={id}
        />
      )}
      {importEmailsOpen && (
        <ImportEmails
          open={importEmailsOpen}
          close={handleCloseImportEmails}
          handleImportEmails={handleImportEmails}
          loading={loadings.get("modal")}
        />
      )}

      {/* {openTableView && <Table open={openTableView} close={handleOpenTableView} elements={elements} personOptions={personOptions} />} */}
      {loadings.get("main") && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.background.default,
            position: "absolute",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Loader bigFont />
        </div>
      )}
      <ShareModal
        open={shareModalOpen}
        loading={loadings.get("modal")}
        close={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default Timeline;
