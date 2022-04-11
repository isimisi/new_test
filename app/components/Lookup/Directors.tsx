import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./lookup.jss";
import InfoPaper from "./InfoPaper";
import Button from "@material-ui/core/Button";

interface Props {
  data: any;
}

const managerPositions = ["CEO", "DIRECTOR"];

const boardPositions = [
  "BOARD_CHAIR",
  "BOARD_MEMBER",
  "BOARD_SUBSTITUTE",
  "BOARD_VICE_CHAIR"
];

const Directors = (props: Props) => {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [showNonActiveManagement, setShowNonActiveManagement] = useState(false);
  const togglemanagement = () =>
    setShowNonActiveManagement(prevVal => !prevVal);

  const [showNonActiveBoard, setShowNonActiveBoard] = useState(false);
  const toggleboard = () => setShowNonActiveBoard(prevVal => !prevVal);

  const management = data.filter(manager => {
    const rightRole = managerPositions.includes(manager.role);
    if (showNonActiveManagement) {
      return rightRole;
    }
    return rightRole && !manager.to;
  });

  const board = data.filter(manager => {
    const rightRole = boardPositions.includes(manager.role);
    if (showNonActiveBoard) {
      return rightRole;
    }
    return rightRole && !manager.to;
  });

  const sortNonActive = (a, b) =>
    // @ts-ignore
    (b.to === null) - (a.to === null) || -(b.to > a.to) || +(b.to < a.to);

  return (
    <div className={classes.lookupContainer}>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.management")}
        </Typography>
        {management.sort(sortNonActive).map(m => (
          <InfoPaper
            header={t(`lookup.${m.role}`)}
            body={m.participant.name}
            active={m.to}
          />
        ))}
        <Button onClick={togglemanagement}>
          {!showNonActiveManagement
            ? t("lookup.earlier_managers")
            : t("lookup.earlier_managers_hide")}
        </Button>
      </div>
      <div className={classes.leadershipContainer}>
        <Typography variant="subtitle1" className={classes.leadershipSubtitle}>
          {t("lookup.board")}
        </Typography>
        {board.sort(sortNonActive).map(m => (
          <InfoPaper
            header={t(`lookup.${m.role}`)}
            body={m.participant.name}
            active={m.to}
          />
        ))}
        <Button onClick={toggleboard}>
          {!showNonActiveBoard
            ? t("lookup.earlier_board")
            : t("lookup.earlier_board_hide")}
        </Button>
      </div>
    </div>
  );
};

export default Directors;
