import { useCallback, useEffect, useState } from "react";
import connection from "@api/socket/SocketConnection";
import { getLayoutedElements, initErstTypes, reducer } from "@pages/Workspaces/constants";
import { NodeDropdown, WorkspaceRelationship } from "@customTypes/reducers/workspace";
import { List } from "immutable";
import { AppDispatch, RootState } from "@redux/configureStore";
import { cvrSuccess, cvrWorkspace, doNotShowInternationalDisclaimerAgain, showNotifAction, stopLoading, uncertainCompaniesChange } from "@pages/Workspaces/reducers/workspaceActions";
import { TypedUseSelectorHook } from "react-redux";
import { VoidFunc } from "@customTypes/generic";
import { User } from "@auth0/auth0-react";
import { TFunction } from "react-i18next";


const useCvr = (
  dispatch: AppDispatch,
  useAppSelector: TypedUseSelectorHook<RootState>,
  id: string,
  t: TFunction<"translation", undefined>,
  user: User,
  nodes?: NodeDropdown[],
  relationships?: List<WorkspaceRelationship>,
  onWorkspaceSave?: VoidFunc,
  koncernDiagramEnd?: VoidFunc,
) => {
  const internationalDisclaimer = useAppSelector(state => state[reducer].get('showInternationalDisclaimer'));

  const [showCvrModal, setShowCvrModal] = useState(false);
  const [showMapErst, setShowMapErst] = useState(false);
  const [erstTypes, setErstTypes] = useState(initErstTypes);
  // socket for cvr
  const [subscription, setSubscription] = useState(null);
  // const [colabSubscription, setColabSubscription] = useState(null);

  const [showInternationalDisclaimer, setShowInternationalDisclaimer] = useState(false);

  const closeInternationalDisclaimer = (doNotShowAgain) => {
    setShowInternationalDisclaimer(false);
    if (doNotShowAgain) {
      dispatch(doNotShowInternationalDisclaimerAgain);
    }
  };

  const handleCvrSuccess = useCallback((_nodes, _edges) => {
    setShowCvrModal(false);
    dispatch(cvrSuccess(getLayoutedElements(_nodes, _edges)));


    koncernDiagramEnd && koncernDiagramEnd();

    if (internationalDisclaimer && _nodes[0].data.data_provider === "firmnav") {
      setShowInternationalDisclaimer(true);
    }
    setTimeout(() => {
      document.getElementById("fitView")?.click();
      onWorkspaceSave && onWorkspaceSave();
    }, 100
    );
  }, []);


  const handleCvrError = useCallback(() => {
    setShowCvrModal(false);
    dispatch(showNotifAction(t('workspaces.drawing_error')));
    dispatch(stopLoading);
  }, []);

  const handleUncertainCompanies = useCallback((companies = []) => {
    companies.length > 0 && setShowCvrModal(true);
    dispatch(uncertainCompaniesChange(companies));
  }, []);

  // const handleNewConnection = (data) => {
  //   dispatch(setConnectedUsers(data));
  // };

  const onConfirm = (value, close) => {
    const erstNodeArray = Object.values(erstTypes.nodes);
    const erstEdgeArray = Object.values(erstTypes.edges);
    const nodeLabels = (nodes as NodeDropdown[]).map((node) => node.label);
    const relationshipLabels = (relationships as List<WorkspaceRelationship>).toJS().map((r) => r.label);
    if (
      erstNodeArray.every((n) => nodeLabels.includes(n)) &&
      erstEdgeArray.every((e) => relationshipLabels.includes(e))
    ) {
      if (!subscription) {
        connection.connect();
        const sub = connection.subscribeToCvr(
          "cvr:" + id,
          handleCvrSuccess,
          handleCvrError,
          handleUncertainCompanies
        );
        setSubscription(sub);
      }
      dispatch(cvrWorkspace(user, id as string, value, close, erstTypes));
    } else {
      setShowMapErst(true);
    }
  };

  useEffect(() => {
    connection.connect(user);

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument

    const sub = connection.subscribeToCvr(
      "cvr:" + id,
      handleCvrSuccess,
      handleCvrError,
      handleUncertainCompanies
    );
    setSubscription(sub);

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
  }, []);

  return {
    showCvrModal,
    showMapErst,
    setErstTypes,
    showInternationalDisclaimer,
    closeInternationalDisclaimer,
    onConfirm,
    setShowCvrModal,
    handleUncertainCompanies,
    setShowMapErst,
    erstTypes,
    subscription
  };
};

export default useCvr;
