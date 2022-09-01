/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-eval */
import React, { useEffect, useRef, useState } from "react";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventIcon from "@material-ui/icons/Event";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MaterialAvatar from "@material-ui/core/Avatar";
import {
  stringToColor,
  stringAvatar,
  nodeTypes
} from "@pages/Timelines/constants";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { showPerson } from "@pages/Persons/reducers/personActions";
import { useAuth0, User } from "@auth0/auth0-react";
import {
  openTag,
  timelineElementDocumentChange,
  timelineElementPersonChange
} from "@pages/Timelines/reducers/timelineActions";
import { showDocument } from "@pages/Documents/reducers/documentActions";
import CircularProgress from "@material-ui/core/CircularProgress";


interface Props {
  classes: any;
  t: any;
  elements: any;
  handleOpenNodeTable: () => void;
  openPeople: () => void;
  openDocuments: () => void;
  openTags: () => void;
}

type ActiveItem = "People" | "Documents" | "Tags" | "Elements";

const Overview = ({ classes, t, elements, handleOpenNodeTable, openPeople, openDocuments, openTags }: Props) => {
  const [activeMenuItem, setActiveMenuItem] = useState<ActiveItem | null>(null);
  const dispatch = useAppDispatch();
  const loadingsPerson = useAppSelector(state =>
    state.person.getIn(["loadings", "main"])
  );
  const loadingsDocument = useAppSelector(state =>
    state.document.getIn(["loadings", "main"])
  );

  const user = useAuth0().user as User;


  const [itemOpen, setItemOpen] = useState(false);

  const anchorRefPeople = useRef<HTMLButtonElement>(null);
  const anchorRefDocuments = useRef<HTMLButtonElement>(null);
  const anchorRefTags = useRef<HTMLButtonElement>(null);
  const anchorRefElements = useRef<HTMLButtonElement>(null);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleClickAway = (event: React.MouseEvent<EventTarget>) => {
    if (
      (anchorRefPeople.current &&
        anchorRefPeople.current.contains(event.target as HTMLElement)) ||
      (anchorRefDocuments.current &&
        anchorRefDocuments.current.contains(event.target as HTMLElement)) ||
      (anchorRefTags.current &&
        anchorRefTags.current.contains(event.target as HTMLElement)) ||
      (anchorRefElements.current &&
        anchorRefElements.current.contains(event.target as HTMLElement))
    ) {
      return;
    }
    setActiveMenuItem(null);
    setItemOpen(false);
  };

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const openPerson = () => dispatch(timelineElementPersonChange(true));
  const handleOpenPerson = id => {
    dispatch(showPerson(user, id, openPerson));
  };

  const openDocument = () => dispatch(timelineElementDocumentChange(true));
  const handleOpenDocument = id => {
    dispatch(showDocument(user, id, openDocument));
  };

  const handleOpenTag = tag => dispatch(openTag(tag));


  const getItems = (activeItem: ActiveItem) => {
    const nodes = elements.filter(e => nodeTypes.includes(e.type));
    const item: any[] = [];

    switch (activeItem) {
      case "People":
        for (let index = 0; index < nodes.length; index++) {
          const node = nodes[index];
          const { persons } = node.data;
          for (let z = 0; z < persons.length; z++) {
            const person = persons[z];
            const existingItem = item.find(p => p.id === person.id);
            if (!existingItem) {
              item.push({
                type: "People",
                icon: (
                  <MaterialAvatar
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
                ),
                name: person.name || person.email,
                id: person.id,
                used: 1,
                onClick: () => handleOpenPerson(person.id)
              });
            } else {
              existingItem.used++;
            }
          }
        }

        break;
      case "Documents":
        for (let index = 0; index < nodes.length; index++) {
          const node = nodes[index];
          const { documents } = node.data;

          for (let z = 0; z < documents.length; z++) {
            const document = documents[z];
            const existingItem = item.find(d => d.id === document.id);

            if (!existingItem) {
              item.push({
                type: "Documents",
                icon: <DescriptionIcon />,
                name: document.title,
                id: document.id,
                used: 1,
                onClick: () => handleOpenDocument(document.id)
              });
            } else {
              existingItem.used++;
            }
          }
        }
        break;
      case "Tags":
        for (let index = 0; index < nodes.length; index++) {
          const node = nodes[index];
          const { tags } = node.data;

          for (let z = 0; z < tags.length; z++) {
            const tag = tags[z];

            const existingItem = item.find(d => d.name === tag.name);

            if (!existingItem) {
              item.push({
                type: "Tags",
                icon: (
                  <div
                    style={{
                      backgroundColor: tag.color,
                      width: 12,
                      height: 12,
                      borderRadius: 6
                    }}
                  />
                ),
                name: tag.name,
                id: tag.id,
                used: 1,
                onClick: () => handleOpenTag(tag.name)
              });
            } else {
              existingItem.used++;
            }
          }
        }
        break;
    }

    setMenuItems(item);
  };

  const handleMenuHover = (activeItem: ActiveItem) => {
    setItemOpen(true);
    getItems(activeItem);
    setActiveMenuItem(activeItem);
  };

  const handleMenuClick = (activeItem: ActiveItem) => {
    switch (activeItem) {
      case "People":
        openPeople();
        break;
      case "Documents":
        openDocuments();
        break;
      case "Tags":
        openTags();
        break;
    }
  };

  const paperLeave = e => {
    const _time = setTimeout(() => {
      handleClickAway(e);
    }, 300);
    setTimer(_time);
  };

  const onPaperEnter = () => timer && clearTimeout(timer);
  return (
    <>
      <IconButton
        className={classes.buttons}
        onClick={() => handleMenuClick("People")}
        onMouseEnter={() => handleMenuHover("People")}
        ref={anchorRefPeople}
      >
        <PeopleIcon className={classes.buttons} />
      </IconButton>
      <IconButton
        className={classes.buttons}
        onClick={() => handleMenuClick("Documents")}
        onMouseEnter={() => handleMenuHover("Documents")}
        ref={anchorRefDocuments}
      >
        <DescriptionIcon className={classes.buttons} />
      </IconButton>
      <IconButton
        className={classes.buttons}
        onClick={() => handleMenuClick("Tags")}
        onMouseEnter={() => handleMenuHover("Tags")}
        ref={anchorRefTags}
      >
        <LocalOfferIcon className={classes.buttons} />
      </IconButton>
      <IconButton
        className={classes.buttons}
        onClick={handleOpenNodeTable}
        onMouseEnter={paperLeave}
        ref={anchorRefElements}
      >
        <EventIcon className={classes.buttons} />
      </IconButton>

      {activeMenuItem && (
        <Popper
          open={itemOpen}
          anchorEl={eval(`anchorRef${activeMenuItem}`).current}
          role={undefined}
          transition
          disablePortal
          onMouseEnter={onPaperEnter}
          onMouseLeave={paperLeave}
          style={{ zIndex: 1000, marginTop: 10 }}
          placement="bottom-start"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper elevation={4} style={{ backgroundColor: "#fcfcfc" }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  {loadingsPerson || loadingsDocument ? (
                    <CircularProgress style={{ margin: 5 }} size={30} />
                  ) : (
                    <MenuList>
                      {menuItems
                        .sort((a, b) => b.used - a.used)
                        .slice(0, 5)
                        .map(item => (
                          <MenuItem
                            className={classes.menuItem}
                            key={item.id}
                            onClick={item.onClick}
                          >
                            <ListItemText style={{ marginRight: 10 }}>
                              {item.name}
                            </ListItemText>
                            <ListItemSecondaryAction
                              style={{ display: "flex" }}
                            >
                              <Paper className={classes.countContainer}>
                                <Typography className={classes.tagCount}>
                                  {item.used}
                                </Typography>
                              </Paper>
                            </ListItemSecondaryAction>
                          </MenuItem>
                        ))}
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() => handleMenuClick(menuItems[0]?.type)}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            style: { fontWeight: "bold" }
                          }}
                        >
                          {`${t("generic.see_all")}`}
                        </ListItemText>
                        <ListItemSecondaryAction style={{ display: "flex" }}>
                          <Paper className={classes.countContainer}>
                            <Typography className={classes.tagCount}>
                              {menuItems.length}
                            </Typography>
                          </Paper>
                        </ListItemSecondaryAction>
                      </MenuItem>
                    </MenuList>
                  )}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}

    </>
  );
};
export default Overview;
