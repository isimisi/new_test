import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { IPerson } from "@customTypes/reducers/person";

interface Props {
  person: IPerson;
  t: any;
  classes: any;
  handleEdit: () => void;
}

const PersonTable = (props: Props) => {
  const { person, t, classes, handleEdit } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        {person.get("name")}
      </Typography>

      <Card style={{ width: "100%" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          }
          subheader={person.get("description")}
          subheaderTypographyProps={{
            // @ts-ignore
            color: "black"
          }}
        />
        <CardContent>
          <div className={classes.row}>
            <Typography className={classes.fat}>
              {t("person.affiliation")}
:
            </Typography>

            <Typography>{person.get("affiliation")}</Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.fat}>
              {t("person.company")}
:
            </Typography>
            <Typography>{person.get("company")}</Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.fat}>
              {t("address")}
:
            </Typography>
            <Typography>{person.get("address")}</Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.fat}>
              {t("email")}
:
            </Typography>
            <Typography>{person.get("email")}</Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.fat}>
              {t("phone")}
:
            </Typography>
            <Typography>{person.get("phone")}</Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PersonTable;
