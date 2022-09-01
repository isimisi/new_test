/* eslint-disable no-case-declarations */
/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Typography,
  Chip,
  Avatar,
  Button
} from "@material-ui/core";

import { stringToColor, stringAvatar } from "@pages/Timelines/constants";
import DoneIcon from "@material-ui/icons/Done";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  clearFilter,
  filterTimeline
} from "@pages/Timelines/reducers/timelineActions";

interface Props {
  open: boolean;
  close: () => void;
  anchor: HTMLButtonElement | null;
  t: any;
  classes: any;
}

const FilterPopper = (props: Props) => {
  const { open, close, anchor, t, classes } = props;

  const dispatch = useAppDispatch();
  const persons = useAppSelector(state =>
    state.timeline.get("timelinePersons")
  ).toJS();
  const documents = useAppSelector(state =>
    state.timeline.get("timelineDocuments")
  ).toJS();
  const tags = useAppSelector(state =>
    state.timeline.get("timelineTags")
  ).toJS();
  const filters = useAppSelector(state => state.timeline.get("filters"));

  const handleClick = (item, type) => {
    if (type === "tags") {
      dispatch(filterTimeline(item.name));
    }

    if (type === "persons") {
      dispatch(filterTimeline("p" + item.id));
    }

    if (type === "documents") {
      dispatch(filterTimeline("d" + item.id));
    }
  };

  const handleClear = () => dispatch(clearFilter);

  return (
    <Popper
      open={open}
      anchorEl={anchor}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 1000, marginTop: 10 }}
      placement="bottom-start"
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            elevation={4}
            style={{
              backgroundColor: "#fcfcfc",
              padding: 10,
              maxHeight: "50vh",
              overflowY: "auto"
            }}
          >
            <ClickAwayListener onClickAway={close}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography style={{ fontWeight: "bold", fontSize: 18 }}>
                    {t("timeline.filter")}
                  </Typography>
                  <Button onClick={handleClear}>{t("generic.clear")}</Button>
                </div>
                <div style={{ width: 400 }}>
                  <div>
                    <Typography className={classes.filterHeaders}>
                      {t("generic.tags")}
                    </Typography>
                    <div className={classes.filterChipContainer}>
                      {tags.map(tag => (
                        <Chip
                          className={classes.filterChip}
                          variant="outlined"
                          color={
                            filters.includes(tag.name) ? "primary" : "default"
                          }
                          icon={
                            <div className={classes.chipIconContainer}>
                              {filters.includes(tag.name) ? (
                                <DoneIcon
                                  color="primary"
                                  className={classes.filterDone}
                                />
                              ) : (
                                <div
                                  className={classes.tag}
                                  style={{ backgroundColor: tag.color }}
                                />
                              )}
                            </div>
                          }
                          onClick={() => handleClick(tag, "tags")}
                          label={tag.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Typography className={classes.filterHeaders}>
                      {t("generic.persons")}
                    </Typography>
                    <div className={classes.filterChipContainer}>
                      {persons.map(person => (
                        <Chip
                          className={classes.filterChip}
                          variant="outlined"
                          color={
                            filters.includes(`p${person.id}`)
                              ? "primary"
                              : "default"
                          }
                          icon={
                            <div className={classes.chipIconContainer}>
                              {filters.includes(`p${person.id}`) ? (
                                <DoneIcon
                                  color="primary"
                                  className={classes.filterDone}
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: stringToColor(
                                      person.name || person.email
                                    ),
                                    fontSize: 8
                                  }}
                                  {...stringAvatar(person.name, person.email)}
                                />
                              )}
                            </div>
                          }
                          onClick={() => handleClick(person, "persons")}
                          label={person.name || person.email}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Typography className={classes.filterHeaders}>
                      {t("generic.documents")}
                    </Typography>
                    <div className={classes.filterChipContainer}>
                      {documents.map(document => (
                        <Chip
                          className={classes.filterChip}
                          variant="outlined"
                          color={
                            filters.includes(`d${document.id}`)
                              ? "primary"
                              : "default"
                          }
                          icon={
                            <div className={classes.chipIconContainer}>
                              {filters.includes(`d${document.id}`) ? (
                                <DoneIcon
                                  color="primary"
                                  className={classes.filterDone}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                    border: "1px solid black"
                                  }}
                                />
                              )}
                            </div>
                          }
                          onClick={() => handleClick(document, "documents")}
                          label={document.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default FilterPopper;
