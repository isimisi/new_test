/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from "react";


import { useHistory } from "react-router-dom";
import { authHeader, baseUrl, encryptId, getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Notification from "@components/Notification/Notification";
import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";
import useStyles from "./timeline-jss";
import axios from "axios";
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
  timelineElementPersonChange, timelineElementDocumentChange, saveElement, changeTimelineNodeKey, setTimelineNode, putElement, deleteElements, openEmailChange, changeView, setIsUpdating
} from "./reducers/timelineActions";
import ReactFlow, {
  Background,
  BackgroundVariant,
  OnLoadParams,

} from "react-flow-renderer";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { getPlanId } from "@helpers/userInfo";
import Collaboration from "@components/Flow/Actions/Collaborations";
import Meta from "@components/Flow/Actions/Meta";
import { Person as TPerson } from "@customTypes/reducers/person";
import { Document as TDocument } from "@customTypes/reducers/document";
import Controls from "@components/Flow/Actions/Controls";
import { useTheme } from "@material-ui/core/styles";
import Loader from "@components/Loading/LongLoader";
import { handleExport } from "@helpers/export/handleExport";
import { getGroupDropDown, workspacePowerpoint } from "../Workspaces/reducers/workspaceActions";
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
import Table from "@components/Timeline/Drawer/Table";
import WorkspaceMeta from "@components/Workspace/Modals/WorkspaceMeta";
import CreateElement from "@components/Timeline/Modals/CreateElement";
import { changePerson, getPersonDropDown, showPerson } from "../Persons/reducers/personActions";
import Person from "@components/Timeline/Modals/Person";
import Document from "@components/Timeline/Modals/Document";
import { changeDocument, getDocumentDropDown, showDocument } from "../Documents/reducers/documentActions";
import { TimelineNode } from "@customTypes/reducers/timeline";
import Email from "@components/Timeline/Modals/Email";
import VerticalNode from "@components/Timeline/Nodes/VerticalNode";
import Content from "@components/Timeline/Drawer/Content";
import getDrawerWidth from "@hooks/timeline/drawerWidth";


const nodeTypes = {
  horizontal: HorizontalNode,
  vertical: VerticalNode,
  addItem: AddItemNode
};

const edgeTypes = {
  custom: EdgeWithButton
};

const Timeline = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const elements = useAppSelector(state => state[reducer].get("elements")).toJS();

  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const createElementOpen = useAppSelector(state => state[reducer].get("createElementOpen"));
  const personOptions = useAppSelector(state => state.person.get("personOptions")).toJS();
  const documentOptions = useAppSelector(state => state.document.get("documentOptions")).toJS();
  const timelineNode = useAppSelector(state => state[reducer].get("timelineNode"));
  const view = useAppSelector(state => state[reducer].get("view"));

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

  const changeTimelineNode = (attr: keyof TimelineNode, val: TimelineNode[keyof TimelineNode]) => {
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
  const handleDocumentClose = () => dispatch(timelineElementDocumentChange(false));

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

  const handleEmailClose = () => dispatch(openEmailChange(false));


  const handleCloseCreateElement = () => {
    dispatch(setTimelineNode(null));
    setElementPersons([]);
    setElementDocuments([]);
    dispatch(createElementChange(false));
  };

  const [openTableView, setOpenTableView] = useState(false);


  const handleOpenTableView = (bool) => {
    setOpenTableView(bool);
  };


  const handleVisability = useAppSelector(state =>
    state[reducer].get("handleVisability")
  );
  const personModalOpen = useAppSelector(state =>
    state[reducer].get("personOpen")
  );
  const documentModalOpen = useAppSelector(state =>
    state[reducer].get("documentOpen")
  );
  const emailModalOpen = useAppSelector(state =>
    state[reducer].get("emailOpen")
  );
  const loadings = useAppSelector(state => state[reducer].get("loadings"));
  const label = useAppSelector(state => state[reducer].get("title"));
  const description = useAppSelector(state =>
    state[reducer].get("description")
  );
  const group = useAppSelector(state => state[reducer].get("group"));
  const shareOrg = useAppSelector(state => state[reducer].get("shareOrg"));
  const tags = useAppSelector(state =>
    state[reducer].get("specificTimelineTags")
  )?.toJS();
  const groupsDropDownOptions = useAppSelector(state => state.workspace.get('groupsDropDownOptions')).toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const isUpdatingNode = useAppSelector(state => state[reducer].get('isUpdatingNode'));

  const handleVisabilityChange = () =>
    dispatch(changeHandleVisability(!handleVisability));
  const handleImage = (type, _stopLoading) =>
    handleExport(type, reactFlowContainer, label, _stopLoading);
  const handlePowerpoint = _stopLoading => {
    id &&
      dispatch(workspacePowerpoint(user, id, label, elements, _stopLoading));
  };
  const toggleSubMenu = () => dispatch(toggleAction);

  const onLoad = _reactFlowInstance => {
    setRfInstance(_reactFlowInstance);
    dispatch(showTimeline(user, id as string, setMetaOpen, _reactFlowInstance));
    _reactFlowInstance.fitView();
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      // save
    }
  }, [rfInstance, user]);

  const onMouseLeave = useCallback(() => {
    onSave();
  }, [rfInstance, elements]);

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
    _tags => dispatch(changeTags(_tags)),
    []
  );
  const handleLabelChange = useCallback(
    e => dispatch(labelChange(e.target.value)),
    []
  );
  const handleDescriptionChange = useCallback(
    e => dispatch(descriptionChange(e.target.value)),
    []
  );
  const handleAddGroup = useCallback(_group => dispatch(addGroup(_group.value)), []);
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

  const onSaveElement = () => {
    if (isUpdatingNode) {
      dispatch(putElement(user, timelineNode, elementPersons, elementDocuments, handleCloseCreateElement));
    } else {
      dispatch(saveElement(user, id, timelineNode, elementPersons, elementDocuments, handleCloseCreateElement));
    }
  };

  const onSavePerson = (person: TPerson) => {
    setElementPersons(prevState => {
      const newPersons = [...prevState];
      const newPersonsFiltered = newPersons.filter(p => {
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
    setElementDocuments(prevState => {
      const newDocuments = [...prevState];
      const newDocumentsFiltered = newDocuments.filter(p => {
        if (p.id) {
          return p.id !== document.id;
        }
        return p.title !== document.title;
      });

      return [...newDocumentsFiltered, document];
    });
    dispatch(timelineElementDocumentChange(false));
  };


  const onSaveDocument = async (document: TDocument, stopLoading: () => void) => {
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

  return (
    <div style={{ display: "flex" }}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <div
        className={classnames(classes.root, {
          [classes.contentShift]: openTableView
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

          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onMove={flowTransform => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          onLoad={onLoad}
        >
          <div data-html2canvas-ignore="true">
            <Collaboration setShareModalOpen={setShareModalOpen} />
            <Meta
              label={label}
              setMetaOpen={setMetaOpen}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handlePowerpoint}
              handleVisability={handleVisability}
              elements={elements}
              handleOpenMenu={toggleSubMenu}
              handleImage={handleImage}
            />
            <Views openTableView={handleOpenTableView} view={view} changeView={handleChangeView} />
            <Controls
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
        open={openTableView}
        PaperProps={{ style: { width: drawerWidth } }}

      >
        <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger}>
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
        />
        {/* <Table /> */}
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
        handleOpenEmail={handleOpenEmail}

      />

      {personModalOpen && <Person open={personModalOpen} close={handlePersonClose} onSave={onSavePerson} />}
      {documentModalOpen && <Document open={documentModalOpen} close={handleDocumentClose} onSave={onSaveDocument} />}
      {emailModalOpen && <Email open={emailModalOpen} close={handleEmailClose} timelineNode={timelineNode} />}
      {loadings.get("main") && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Timeline;
