/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import tableOptions from "@helpers/tableOptions";
import Notification from "@components/Notification/Notification";
import { loadFromLocalStorage } from "@utils/localStorage";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import styles from "./relationship-jss";
import { tableColumns, reducer } from "./constants";
import {
  getRelationships,
  postRelationship,
  closeNotifAction,
  deleteRelationship
} from "./reducers/relationshipActions";

function Relationships(props) {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const relationships = useAppSelector(state =>
    state[reducer].get("relationships")
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getRelationships());

    if (plan_id === 1) {
      history.push("/app/plan");
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedRelationships = data.map(v => ({
      id: relationships[v.index][3],
      title: relationships[v.index][0]
    }));
    deletedRelationships.forEach(e => {
      const id = CryptoJS.AES.decrypt(
        decodeURIComponent(e.id),
        "path"
      ).toString(CryptoJS.enc.Utf8);
      dispatch(deleteRelationship(id, e.title));
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
        onClick={() => dispatch(postRelationship(history))}
      >
        {`${t("relationships.btn_new_relationship")}`}
      </Fab>
    </div>
  );
}

Relationships.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Relationships);
