/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { User } from "@auth0/auth0-react";
import Avatar from "@material-ui/core/Avatar";
import {
  stringToColor,
  stringAvatar,
  nodeTypes
} from "@pages/Timelines/constants";
import { timelineElementPersonChange } from "@pages/Timelines/reducers/timelineActions";
import { showPerson } from "@pages/Persons/reducers/personActions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function Persons(props: Props) {
  const { open, close, user } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const nodeElements = useAppSelector((state) =>
    state.timeline.get("nodes")
  ).toJS();

  const [people, setPeople] = useState<any>([]);

  const openPerson = () => dispatch(timelineElementPersonChange(true));
  const handleOpenPerson = (id) => {
    dispatch(showPerson(user, id, openPerson));
  };

  useEffect(() => {
    const nodes = nodeElements.filter((e) => nodeTypes.includes(e.type));
    const item: any[] = [];

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const { persons } = node.data;
      for (let z = 0; z < persons.length; z++) {
        const person = persons[z];
        const existingItem = item.find((p) => p.id === person.id);
        if (!existingItem) {
          item.push({
            ...person,
            used: 1,
            onClick: () => handleOpenPerson(person.id)
          });
        } else {
          existingItem.used++;
        }
      }
    }

    setPeople(item.sort((a, b) => b.used - a.used));
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("timeline.people")}
        expanded
        width="60%"
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          <TableContainer component={Paper} style={{ marginTop: 0 }}>
            <Table
              aria-label="collapsible table"
              style={{ marginTop: 0 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">{t("person.name")}</TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="left">{t("person.company")}</TableCell>
                  <TableCell align="left">{t("person.affiliation")}</TableCell>
                  <TableCell align="left" width="50 px" />
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((row) => (
                  <TableRow>
                    <TableCell align="left">
                      <Avatar
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: stringToColor(row.name || row.email),
                          fontSize: 8
                        }}
                        {...stringAvatar(row.name, row.email)}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                    <TableCell align="left">{row.affiliation}</TableCell>
                    <TableCell align="left">
                      <Paper className={classes.countContainer}>
                        <Typography className={classes.tagCount}>
                          {row.used}
                        </Typography>
                      </Paper>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={row.onClick}
                      >
                        {t("columns.btn_open")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default Persons;
