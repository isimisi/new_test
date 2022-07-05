/* eslint-disable no-param-reassign */
import React from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import PersonForm from "@components/Person/PersonForm";
import EditAvatar from "@pages/Avatar";

import { changePerson } from "@pages/Persons/reducers/personActions";
import { Person } from "@customTypes/reducers/person";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (person: Person) => void;
}

const Person = (props: Props) => {
  const { open, close, onSave } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const person = useAppSelector(state => state.person.get("person"));
  const createElementOpen = useAppSelector(state =>
    state.timeline.get("createElementOpen")
  );

  const { t } = useTranslation();

  const handleSave = () => {
    onSave(person.toJS());
  };

  const handleGetConfig = (_config: any) => {
    delete _config.id;
    dispatch(changePerson(JSON.stringify(_config), "person_icon"));
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("person.form_header")}
        expanded
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          <PersonForm isUpdatingNode={createElementOpen} />
          <div style={{ margin: 16 }} />
          <EditAvatar
            /* @ts-ignore */
            getConfig={handleGetConfig}
            avatar={JSON.parse(person.get("person_icon"))}
          />
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>

          {createElementOpen && (
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleSave}
            >
              {t("workspaces.workspace-form.btn_save")}
            </Button>
          )}
        </div>
      </FloatingPanel>
    </div>
  );
};

export default Person;
