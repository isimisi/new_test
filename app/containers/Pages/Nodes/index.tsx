/* eslint-disable camelcase */
import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { useSelector, useDispatch } from "react-redux";
import Notification from "@components/Notification/Notification";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  getNodes,
  postNode,
  closeNotifAction,
  deleteNode
} from "./reducers/nodeActions";
import tableOptions from "@helpers/tableOptions";
import useStyles from "./node-jss";
import { tableColumns, reducer } from "./constants";
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";

const Nodes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nodes = useSelector(state => state[reducer].get("nodes")).toJS();
  const messageNotif = useSelector(state => state[reducer].get("message"));
  const loading = useSelector(state => state[reducer].get("loading"));
  const history = useHistory();
  const { user } = useAuth0();
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  useEffect(() => {
    user && dispatch(getNodes(user));

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({
      id: nodes[v.dataIndex][3],
      title: nodes[v.dataIndex][0]
    }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      user && dispatch(deleteNode(user, id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <MUIDataTable
        title={t("nodes.your_elements")}
        data={nodes}
        columns={tableColumns(t)}
        options={tableOptions(onDelete, loading)}
      />
      <Tooltip title={`${t("nodes.btn_new_element")}`}>
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => user && dispatch(postNode(user, history))}
        >
          {`${t("nodes.btn_new_element")}`}
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Nodes;
