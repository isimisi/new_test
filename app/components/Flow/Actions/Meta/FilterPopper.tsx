/* eslint-disable no-case-declarations */
/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */
import React, { useState } from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  Typography,
  MenuItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import CustomSwitch from "@components/Switch/CustomSwitch";

import { FlowElement, isNode, Node } from "react-flow-renderer";

interface Props {
  open: boolean;
  close: () => void;
  anchor: HTMLButtonElement | null;
  t: any;
  elements: FlowElement[];
  classes: any;
}

const FilterPopper = (props: Props) => {
  const { open, close, anchor, t, elements, classes } = props;

  const persons: any = [];
  const documents: any = [];
  const tags: any = [];

  const nodes = elements.filter(
    (element): element is Node => isNode(element) && element.type !== "addItem"
  );

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const { persons: _persons, documents: _documents, tags: _tags } = node.data;

    for (let z = 0; z < _persons.length; z++) {
      const person = _persons[z];
      if (!persons.some(p => p.id === person.id)) {
        persons.push(person);
      }
    }

    for (let z = 0; z < _documents.length; z++) {
      const document = _documents[z];
      if (!documents.some(p => p.id === document.id)) {
        documents.push(document);
      }
    }

    for (let z = 0; z < _tags.length; z++) {
      const tag = _tags[z];
      if (!tags.some(p => p.name === tag.name)) {
        tags.push(tag);
      }
    }
  }

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
            style={{ backgroundColor: "#fcfcfc", padding: 10 }}
          >
            <ClickAwayListener onClickAway={close}>
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  {t("generic.tags")}
                </Typography>
                <MenuList>
                  <MenuItem className={classes.menuItem}>
                    <ListItemText>{t("workspaces.excel")}</ListItemText>
                    <ListItemSecondaryAction style={{ right: 0 }}>
                      <CustomSwitch />
                    </ListItemSecondaryAction>
                  </MenuItem>
                </MenuList>
                <Typography style={{ fontWeight: "bold" }}>
                  {t("generic.persons")}
                </Typography>
                <MenuList>
                  <MenuItem className={classes.menuItem}>
                    <ListItemText>{t("workspaces.excel")}</ListItemText>
                    <ListItemSecondaryAction style={{ right: 0 }}>
                      <CustomSwitch />
                    </ListItemSecondaryAction>
                  </MenuItem>
                </MenuList>
                <Typography style={{ fontWeight: "bold" }}>
                  {t("generic.documents")}
                </Typography>
                <MenuList>
                  <MenuItem className={classes.menuItem}>
                    <ListItemText>{t("workspaces.excel")}</ListItemText>
                    <ListItemSecondaryAction style={{ right: 0 }}>
                      <CustomSwitch />
                    </ListItemSecondaryAction>
                  </MenuItem>
                </MenuList>
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default FilterPopper;
