/* eslint-disable no-param-reassign */
import React, { useMemo } from "react";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import { useAppSelector } from "@hooks/redux";

import NodesTable from "../Util/NodesTable";
import { isNode } from "react-flow-renderer";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  close: () => void;
}

const NodesTableModal = (props: Props) => {
  const { open, close } = props;

  const classes = useStyles();

  const elements = useAppSelector(state =>
    state.timeline.get("elements")
  ).toJS();

  const nodes = useMemo(
    () =>
      elements.filter((e): e is Node => isNode(e) && e.id !== "static-button"),
    [elements]
  );

  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("timeline.nodesTable")}
        expanded
        width="60%"
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          <NodesTable nodes={nodes} t={t} close={close} />
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default NodesTableModal;
