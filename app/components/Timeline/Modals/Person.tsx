/* eslint-disable no-param-reassign */
import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import PersonForm from "@components/Person/PersonForm";
import { Person } from "@customTypes/reducers/person";
import { isNode, Node } from "react-flow-renderer";
import NodesTable from "../Util/NodesTable";
import PersonCard from "../Util/PersonCard";
import { putPerson } from "@pages/Persons/reducers/personActions";
import { User } from "@auth0/auth0-react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  user: User;
  open: boolean;
  close: () => void;
  onSave: (person: Person) => void;
}

function Person(props: Props) {
  const { open, close, onSave, user } = props;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const person = useAppSelector((state) => state.person.get("person"));
  const elements = useAppSelector((state) =>
    state.timeline.get("elements")
  ).toJS();
  const loadings = useAppSelector((state) => state.person.get("loadings"));

  const nodes = useMemo(
    () =>
      elements
        .filter((e): e is Node => isNode(e))
        .filter(
          (n) =>
            n.data.persons &&
            n.data.persons.some((p) => p.id === person.get("id"))
        ),
    [elements, person]
  );

  const createElementOpen = useAppSelector((state) =>
    state.timeline.get("createElementOpen")
  );

  const { t } = useTranslation();

  const [edit, setEdit] = useState(false);
  const handleEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const handleSave = () => {
    if (edit) {
      dispatch(
        putPerson(user, person.get("id"), person.toJS(), undefined, closeEdit)
      );
    } else {
      onSave(person.toJS());
    }
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("person.form_header")}
        expanded
        width="60%"
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          {createElementOpen || edit ? (
            <PersonForm />
          ) : (
            <PersonCard
              t={t}
              person={person}
              classes={classes}
              handleEdit={handleEdit}
            />
          )}
          <div style={{ margin: 30 }} />
          {!edit && !createElementOpen && (
            <NodesTable
              nodes={nodes}
              t={t}
              name={person.get("name")}
              close={close}
            />
          )}
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>

          {(createElementOpen || edit) && (
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleSave}
            >
              {loadings.get("post") ? <CircularProgress /> : `${t("save")}`}
            </Button>
          )}
        </div>
      </FloatingPanel>
    </div>
  );
}

export default Person;
