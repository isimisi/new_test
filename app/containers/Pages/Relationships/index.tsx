/* eslint-disable camelcase */
import React, { useEffect } from "react";

import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import tableOptions from "@helpers/tableOptions";
import Notification from "@components/Notification/Notification";
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import useStyles from "./relationship-jss";
import { tableColumns, reducer } from "./constants";
import {
  getRelationships,
  postRelationship,
  closeNotifAction,
  deleteRelationship
} from "./reducers/relationshipActions";

function Relationships() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const relationships = useAppSelector(state =>
    state[reducer].get("relationships")
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const history = useHistory();
  const { user } = useAuth0();
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      dispatch(getRelationships(user));
    }

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, [user]);

  const onDelete = ({ data }) => {
    const deletedRelationships = data.map(v => ({
      id: relationships[v.dataIndex][3],
      title: relationships[v.dataIndex][0]
    }));
    deletedRelationships.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      user && dispatch(deleteRelationship(user, id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <MUIDataTable
        title={t("relationships.your_relationships")}
        data={relationships}
        columns={tableColumns(t)}
        options={tableOptions(onDelete, false)}
      />
      <Fab
        variant="extended"
        color="primary"
        className={classes.addBtn}
        onClick={() => user && dispatch(postRelationship(user, history))}
      >
        {`${t("relationships.btn_new_relationship")}`}
      </Fab>
    </div>
  );
}

export default Relationships;
