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
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { ReactFlowInstance } from "react-flow-renderer";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EventIcon from "@material-ui/icons/Event";
import {
  getDate,
  stringToColor,
  timelineNodeDimensions,
  stringAvatar
} from "@pages/Timelines/constants";
import useWindowDimensions from "@hooks/useWindowDiemensions";
import NoContent from "@components/NoContent";
import {
  openTag,
  timelineElementDocumentChange,
  timelineElementPersonChange
} from "@pages/Timelines/reducers/timelineActions";
import { useAppDispatch } from "@hooks/redux";
import { showDocument } from "@pages/Documents/reducers/documentActions";
import { showPerson } from "@pages/Persons/reducers/personActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { TCustomNode } from "@customTypes/reducers/timeline";

interface Props {
  open: boolean;
  close: () => void;
  anchor: HTMLButtonElement | null;
  t: any;
  nodes: TCustomNode[];
  rfInstance: ReactFlowInstance<any> | null | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      width: "100%"
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    },
    divider: {
      marginTop: 5,
      marginBottom: 5
    },
    menuItem: {
      "&:hover": {
        backgroundColor: "transparent"
      },
      "&:hover > div": {
        color: theme.palette.primary.main
      }
    }
  })
);

function SearchPopper(props: Props) {
  const { open, close, anchor, t, nodes: _nodes, rfInstance } = props;
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchText(value);

    const nodes = _nodes.filter((element) => element.type !== "addItem");

    const filteredByDate = nodes
      .filter((n) => getDate(n.data.date, t).includes(value))
      .map((n) => ({
        ...n,
        primary: getDate(n.data.date, t),
        secondary: n.data.label,
        filterType: "node",
        icon: <EventIcon />
      }));

    const filteredByLabel = nodes
      .filter((n) => n.data.label && n.data.label.includes(value))
      .map((n) => ({
        ...n,
        primary: n.data.label || t("generic.noTitle"),
        secondary: getDate(n.data.date, t),
        filterType: "node",
        icon: <TextFieldsIcon />
      }));

    const filteredByDescription = nodes
      .filter((n) => n.data.description && n.data.description.includes(value))
      .map((n) => ({
        ...n,
        primary: n.data.label || t("generic.noTitle"),
        secondary: getDate(n.data.date, t),
        filterType: "node",
        icon: <TextFieldsIcon />
      }));

    const filterByPersons = nodes
      .filter((n) => {
        const names = n.data.persons.map((p) => p.name).join(" ");
        const emails = n.data.persons.map((p) => p.email).join(" ");
        return names.includes(value) || emails.includes(value);
      })
      .map((n) => ({
        ...n,
        primary: n.data.label || t("generic.noTitle"),
        secondary: getDate(n.data.date, t),
        filterType: "node",
        icon: <PeopleAltIcon />
      }));

    const filterByDocuments = nodes
      .filter((n) => {
        const titles = n.data.documents.map((p) => p.title).join(" ");
        return titles.includes(value);
      })
      .map((n) => ({
        ...n,
        primary: n.data.label || t("generic.noTitle"),
        secondary: getDate(n.data.date, t),
        filterType: "node",
        icon: <InsertDriveFileIcon />
      }));

    const persons: any = [];
    const documents: any = [];
    const tags: any = [];

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const {
        persons: _persons,
        documents: _documents,
        tags: _tags
      } = node.data;

      for (let z = 0; z < _persons.length; z++) {
        const person = _persons[z];
        if (!persons.some((p) => p.id === person.id)) {
          persons.push(person);
        }
      }

      for (let z = 0; z < _documents.length; z++) {
        const document = _documents[z];
        if (!documents.some((p) => p.id === document.id)) {
          documents.push(document);
        }
      }

      for (let z = 0; z < _tags.length; z++) {
        const tag = _tags[z];
        if (!tags.some((p) => p.name === tag.name)) {
          tags.push(tag);
        }
      }
    }

    const filteretPersons = persons
      .filter((p) => p.name?.includes(value) || p.email?.includes(value))
      .map((p) => ({
        ...p,
        primary: p.name,
        secondary: p.email,
        filterType: "person",
        icon: (
          <Avatar
            style={{
              width: 20,
              height: 20,
              backgroundColor: stringToColor(p.name || p.email),
              fontSize: 8
            }}
            {...stringAvatar(p.name, p.email)}
          />
        )
      }));

    const filteretDocuments = documents
      .filter((p) => p.title?.includes(value))
      .map((p) => ({
        ...p,
        primary: p.title,
        secondary: "",
        filterType: "document",
        icon: <InsertDriveFileIcon />
      }));

    const filteretTags = tags
      .filter((p) => p.name?.includes(value))
      .map((p) => ({
        ...p,
        primary: p.name,
        secondary: "",
        filterType: "tags",
        icon: (
          <div
            style={{
              backgroundColor: p.color,
              width: 12,
              height: 12,
              borderRadius: 6,
              margin: 1
            }}
          />
        )
      }));

    if (value === "") {
      setSearchResults([]);
    } else {
      setSearchResults([
        ...filteretPersons,
        ...filteretDocuments,
        ...filteretTags,
        ...filteredByDate,
        ...filteredByLabel,
        ...filteredByDescription,
        ...filterByPersons,
        ...filterByDocuments
      ]);
    }
  };

  const { width, height } = useWindowDimensions();

  const dispatch = useAppDispatch();
  const user = useAuth0().user as User;

  const openPerson = () => dispatch(timelineElementPersonChange(true));
  const handleOpenPerson = (id) => {
    dispatch(showPerson(user, id, openPerson));
  };

  const openDocument = () => dispatch(timelineElementDocumentChange(true));
  const handleOpenDocument = (id) => {
    dispatch(showDocument(user, id, openDocument));
  };

  const handleOpenTag = (tag) => dispatch(openTag(tag));

  const handleResultClick = (node) => {
    switch (node.filterType) {
      case "node":
        const { x, y } = node.position;
        const calcX =
          0 - x * 2 + (width || 0) / 2 - timelineNodeDimensions.width / 2;
        const calcY =
          0 -
          y * 2 +
          (height || 0) / 2 +
          timelineNodeDimensions.height / 2 +
          50;

        rfInstance && rfInstance.setViewport({ x: calcX, y: calcY, zoom: 2 });
        break;
      case "person":
        handleOpenPerson(node.id);
        break;
      case "document":
        handleOpenDocument(node.id);
        break;
      case "tags":
        handleOpenTag(node.primary);
        break;
    }
  };

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
          <div>
            <ClickAwayListener onClickAway={close}>
              <div>
                <Paper
                  elevation={4}
                  style={{ backgroundColor: "#fcfcfc", padding: 5 }}
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder={t("timeline.search")}
                      autoFocus
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      onChange={handleSearch}
                      value={searchText}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </Paper>
                {searchText.length > 0 && (
                  <Paper
                    elevation={4}
                    style={{
                      backgroundColor: "#fcfcfc",
                      marginTop: 10,
                      width: 300
                    }}
                  >
                    {searchResults.length === 0 ? (
                      <NoContent
                        text={t("timeline.noResults")}
                        marginTop={0}
                        fontSize="1rem"
                      />
                    ) : (
                      <MenuList
                        style={{ maxHeight: "50vh", overflowY: "auto" }}
                      >
                        {searchResults.map((node) => (
                          <MenuItem
                            className={classes.menuItem}
                            onClick={() => handleResultClick(node)}
                            key={`${node.id}-${node.primary}`}
                          >
                            <ListItemIcon>{node.icon}</ListItemIcon>
                            <ListItemText
                              primary={node.primary}
                              primaryTypographyProps={{
                                style: {
                                  whiteSpace: "normal"
                                }
                              }}
                              secondary={node.secondary}
                              secondaryTypographyProps={{
                                style: {
                                  whiteSpace: "normal",
                                  fontSize: "12px"
                                }
                              }}
                            />
                          </MenuItem>
                        ))}
                      </MenuList>
                    )}
                  </Paper>
                )}
              </div>
            </ClickAwayListener>
          </div>
        </Grow>
      )}
    </Popper>
  );
}

export default SearchPopper;
