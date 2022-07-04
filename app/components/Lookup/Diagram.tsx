import { User } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  cvrSuccess,
  postWorkspace,
  showNotifAction,
  showWorkspace,
  stopLoading,
  uncertainCompaniesChange
} from "@pages/Workspaces/reducers/workspaceActions";
import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  OnLoadParams
} from "react-flow-renderer";
import { useTranslation } from "react-i18next";
import useStyles from "./lookup.jss";
import connection from "@api/socket/SocketConnection";
import { getLayoutedElements } from "@pages/Workspaces/constants";
import { getIdFromEncrypted } from "@api/constants";
import CustomNode from "@components/Workspace/Node/CustomNode";
import Loader from "@components/Loading/LongLoader";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

interface Props {
  data: any;
  user: User;
}

const nodeTypes = {
  custom: CustomNode
};

const Diagram = (props: Props) => {
  const { data, user } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const elements = useAppSelector(state =>
    state.workspace.get("elements")
  ).toJS();
  const workspaceId = useAppSelector(state =>
    state.workspace.get("workspaceId")
  );
  const initialLoadingCvr = useAppSelector(state =>
    state.workspace.get("initialLoadingCvr")
  );

  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const onLoad = _reactFlowInstance => {
    setRfInstance(_reactFlowInstance);

    _reactFlowInstance.fitView();
  };

  const [subscription, setSubscription] = useState(null);

  const handleCvrSuccess = el => {
    dispatch(cvrSuccess(getLayoutedElements(el)));
    const fit = document.getElementsByClassName(
      "react-flow__controls-fitview"
    )[0];

    if (fit) {
      // @ts-ignore
      fit.click();
    }
  };

  const handleCvrError = () => {
    dispatch(showNotifAction(t("workspaces.drawing_error")));
    dispatch(stopLoading);
  };

  const handleUncertainCompanies = (companies = []) => {
    dispatch(uncertainCompaniesChange(companies));
  };

  useEffect(() => {
    connection.connect(user);

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument
    if (workspaceId) {
      const sub = connection.subscribeToCvr(
        "cvr:" + getIdFromEncrypted(workspaceId),
        handleCvrSuccess,
        handleCvrError,
        handleUncertainCompanies
      );
      setSubscription(sub);
    }

    // const sub2 = connection.subscribeToWorkspace(`collaboration:${id}`, handleNewConnection);
    // setColabSubscription(sub2);

    // if (id) {
    //   dispatch(connectNewUser(user, id));
    // }

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (subscription) {
        // @ts-ignore
        subscription.close();
      }

      // if (colabSubscription) {
      //   // @ts-ignore
      //   colabSubscription.close();
      // }
    };
  }, [workspaceId]);

  useEffect(() => {
    dispatch(
      postWorkspace(
        user,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        data
      )
    );
  }, []);

  const handleCreateWorkspace = () => {
    history.push({
      pathname: `/app/workspaces/${workspaceId}`,
      state: { lookup: true }
    });
  };

  return (
    <div className={classes.diagramContainer}>
      {initialLoadingCvr ? (
        <div className={classes.center}>
          <Loader bigFont />
        </div>
      ) : (
        <ReactFlow
          nodeTypes={nodeTypes}
          elements={elements}
          className={classes.flow}
          onLoad={onLoad}
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
          <Button
            variant="contained"
            className={classes.startAWorkspace}
            onClick={handleCreateWorkspace}
            color="primary"
          >
            {t("lookup.start_a_workspace")}
          </Button>
        </ReactFlow>
      )}
    </div>
  );
};

export default Diagram;
