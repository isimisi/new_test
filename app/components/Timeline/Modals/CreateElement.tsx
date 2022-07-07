/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import { DocumentCleanOption } from "@customTypes/reducers/document";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import { useAppSelector } from "@hooks/redux";
import Button from "@material-ui/core/Button";
import css from "@styles/Form.scss";

import { useTranslation } from "react-i18next";
import FloatingPanel from "../../Panel/FloatingPanel";

import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import Email from "../Util/Email";
import CreateForm from "../Util/CreateForm";

interface Props {
  open: boolean;
  close: () => void;
  onSave: () => void;
  personOptions: MixedPersonOptions[];
  documentOptions: DocumentCleanOption[];
  openPerson: (id: string, name?: string) => void;
  openDocument: (id: string, name?: string) => void;
  timelineNode: ITimelineNode;
  changeTimelineNode: (
    attr: keyof TimelineNode,
    val: TimelineNode[keyof TimelineNode]
  ) => void;
  handleDelete: () => void;
  isUpdatingNode: boolean;
  handleSplit: (node: ITimelineNode) => void;
}

const CreateElement = (props: Props) => {
  const {
    open,
    close,
    onSave,
    personOptions,
    documentOptions,
    openPerson,
    openDocument,
    timelineNode,
    changeTimelineNode,
    handleDelete,
    isUpdatingNode,
    handleSplit
  } = props;

  const branch = "";
  const { t } = useTranslation();

  const date = timelineNode.get("date");
  const title = timelineNode.get("title");
  const email = timelineNode.get("email").get("mail");

  const theme = useTheme();
  const loadingsT = useAppSelector(state => state.timeline.get("loadings"));

  const handleSave = () => {
    onSave();
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        title={t("timeline.create_element")}
        expanded
        width={email ? "80%" : "30%"}
        closeForm={close}
      >
        <div>
          <div style={{ display: "flex", maxHeight: "60vh" }}>
            {email && (
              <Paper
                style={{
                  width: "100%",
                  margin: 20,
                  padding: 10,
                  overflowY: "scroll"
                }}
              >
                <Email timelineNode={timelineNode} />
              </Paper>
            )}
            <CreateForm
              personOptions={personOptions}
              documentOptions={documentOptions}
              openPerson={openPerson}
              openDocument={openDocument}
              timelineNode={timelineNode}
              changeTimelineNode={changeTimelineNode}
              showMailButton={Boolean(email)}
              handleSplit={handleSplit}
            />
          </div>

          <div
            className={css.buttonArea}
            style={
              isUpdatingNode
                ? { justifyContent: "space-between", display: "flex" }
                : {}
            }
          >
            {isUpdatingNode && (
              <Button
                variant="contained"
                type="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: theme.palette.error.main,
                  color: "white",
                  marginRight: 10
                }}
              >
                {t("generic.delete")}
              </Button>
            )}
            <div>
              <Button type="button" onClick={close}>
                {t("workspaces.workspace-form.btn_cnx")}
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="button"
                disabled={!date || title?.length === 0 || loadingsT.get("post")}
                onClick={handleSave}
              >
                {loadingsT.get("post") ? (
                  <CircularProgress />
                ) : (
                  t("workspaces.workspace-form.btn_save")
                )}
              </Button>
            </div>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default CreateElement;
