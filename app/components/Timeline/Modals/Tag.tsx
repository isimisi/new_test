/* eslint-disable no-param-reassign */
import React, { useMemo } from "react";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import { useAppSelector } from "@hooks/redux";

import NodesTable from "../Util/NodesTable";

import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  close: () => void;
  tag: string;
}

function Tag(props: Props) {
  const { open, close, tag } = props;

  const classes = useStyles();

  const nodeElements = useAppSelector((state) =>
    state.timeline.get("nodes")
  ).toJS();

  const nodes = useMemo(
    () =>
      nodeElements.filter(
        (n) => n.data.tags && n.data.tags.some((t) => t.name === tag)
      ),
    [nodeElements, tag]
  );

  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={tag}
        expanded
        width="60%"
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          <NodesTable nodes={nodes} t={t} name={tag} close={close} />
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
}

export default Tag;
