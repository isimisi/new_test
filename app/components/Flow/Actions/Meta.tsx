/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import React from "react";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import logo from "@images/logo.svg";
import powerpoint from "@images/icons/powerpoint.png";
import excel from "@images/icons/excel.png";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from '@material-ui/core/CircularProgress';

import Divider from "@material-ui/core/Divider";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import useStyles from "./actions.jss";
import IconButton from "@material-ui/core/IconButton";
import GridOnIcon from "@material-ui/icons/GridOn";
import BorderOuterIcon from "@material-ui/icons/BorderOuter";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import ImageIcon from "@material-ui/icons/Image";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CustomSwitch from "@components/Switch/CustomSwitch";
import Shortcuts from "./Shortcuts";
import * as XLSX from "xlsx";
import { Edge, getIncomers, getOutgoers, isEdge, isNode, Node } from "react-flow-renderer";
import { saveAs } from "file-saver";
import { s2ab } from '@helpers/export/handleExport';
import { useAuth0, User } from "@auth0/auth0-react";

interface Props {
  label: string;
  setMetaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleVisabilityChange: () => void;
  handleVisability: boolean;
  setSnapToGrid?: React.Dispatch<React.SetStateAction<boolean>>;
  snapToGrid?: boolean;
  handleAutoLayout?: () => void;
  handleOpenMenu: () => void;
  handleImage: (type: "image" | "pdf", stopLoading: () => void) => void;
  elements: any;
  handlePowerpoint: (stopLoading: () => void) => void;
  timeline?: boolean;
}

const Meta = (props: Props) => {
  const {
    label,
    elements,
    setMetaOpen,
    handleVisabilityChange,
    handleVisability,
    setSnapToGrid,
    snapToGrid,
    handleAutoLayout,
    handleOpenMenu,
    handleImage,
    timeline,
    handlePowerpoint: generatePp
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const handleOpenMeta = () => setMetaOpen(prevVal => !prevVal);
  const user = useAuth0().user as User;
  const { logo: customLogo } = user["https://juristic.io/meta"].organization;

  const [loadingImg, setLoadingImg] = React.useState(false);
  const stopLoadingImg = () => setLoadingImg(false);
  const startLoadingImg = () => setLoadingImg(true);

  const [loadingPdf, setLoadingPdf] = React.useState(false);
  const stopLoadingPdf = () => setLoadingPdf(false);
  const startLoadingPdf = () => setLoadingPdf(true);

  const [loadingExcel, setLoadingExcel] = React.useState(false);
  const stopLoadingExcel = () => setLoadingExcel(false);
  const startLoadingExcel = () => setLoadingExcel(true);

  const [loadingPp, setLoadingPp] = React.useState(false);
  const stopLoadingPp = () => setLoadingPp(false);
  const startLoadingPp = () => setLoadingPp(true);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const anchorRefSettings = React.useRef<HTMLButtonElement>(null);

  const handleToggleSettings = () => {
    setSettingsOpen(prevOpen => !prevOpen);
  };

  const handleCloseSettings = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRefSettings.current &&
      anchorRefSettings.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setSettingsOpen(false);
  };

  const prevOpen = React.useRef(settingsOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && settingsOpen === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRefSettings.current!.focus();
    }

    prevOpen.current = settingsOpen;
  }, [settingsOpen]);

  const [exportOpen, setExportOpen] = React.useState(false);
  const anchorRefexport = React.useRef<HTMLButtonElement>(null);

  const handleToggleExports = () => {
    setExportOpen(prevVal => !prevVal);
  };

  const handleCloseExports = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRefexport.current &&
      anchorRefexport.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setExportOpen(false);
  };
  const prevOpenExports = React.useRef(exportOpen);
  React.useEffect(() => {
    if (prevOpenExports.current === true && exportOpen === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRefexport.current!.focus();
    }

    prevOpenExports.current = exportOpen;
  }, [exportOpen]);

  const toggleSnapToGrid = () => setSnapToGrid && setSnapToGrid(prevVal => !prevVal);

  const [showShortCuts, setShowShortCuts] = React.useState(false);
  const handleToggleShortCuts = () => setShowShortCuts(prevVal => !prevVal);
  const handleCloseShortcuts = () => setShowShortCuts(false);

  const handleExport = (type: "image" | "pdf") => {
    let stopLoading = stopLoadingImg;
    if (type === "pdf") {
      stopLoading = stopLoadingPdf;
      startLoadingPdf();
    } else {
      startLoadingImg();
    }
    handleImage(type, stopLoading);
  };

  const getSheetName = (node) => {
    const regex = /[^A-Za-z0-9]/g;
    return node.data.displayName ? node.data.displayName.substring(0, 30).replace(regex, "") : node.data.label.substring(0, 30).replace(regex, "");
  };

  const handleExcel = () => {
    startLoadingExcel();

    const wb = XLSX.utils.book_new();
    const nodes = elements.filter((e): e is Node => {
      if (isNode(e)) {
        const checkIfNodeHasText = e.data.label && e.data.label.length > 0 && e.data.displayName && e.data.displayName.length > 0;
        return checkIfNodeHasText;
      }
      return false;
    });


    const names = nodes.map(n => getSheetName(n));


    wb.SheetNames = names.filter((c, index) => names.indexOf(c) === index);

    const header = [
      t("workspace.meta.excel.headers.element"),
      t("workspace.meta.excel.headers.relation"),
      t("workspace.meta.excel.headers.value"),
      t("workspace.meta.excel.headers.type")
    ];


    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];

      const outgoers = getOutgoers(node, elements);
      const incommers = getIncomers(node, elements);

      const outData = outgoers.map(o => {
        const relation = elements.filter((x): x is Edge => isEdge(x))
          .find(x => x.source === node.id && x.target === o.id);

        return (
          {
            [header[0]]: o.data.displayName,
            [header[1]]: relation?.data.label || '',
            [header[2]]: relation?.data.value || '',
            [header[3]]: t("workspace.meta.excel.headers.outgoer")
          });
      });

      const inData = incommers.map(o => {
        const relation = elements.filter((x): x is Edge => isEdge(x))
          .find(x => x.source === o.id && x.target === node.id);

        return (
          {
            [header[0]]: o.data.displayName,
            [header[1]]: relation?.data.label || '',
            [header[2]]: relation?.data.value || '',
            [header[3]]: t("workspace.meta.excel.headers.incommer")
          });
      });

      const wsData = [...outData, ...inData];

      const ws = XLSX.utils.json_to_sheet(wsData, { header });

      wb.Sheets[getSheetName(node)] = ws;
    }
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      `${label}.xlsx`
    );
    setTimeout(() => {
      stopLoadingExcel();
    }, 500);
  };

  const handlePowerpoint = () => {
    startLoadingPp();
    generatePp(stopLoadingPp);
  };

  return (
    <>
      <Paper elevation={4} className={classes.metaPaper}>
        <Tooltip arrow title={`${t("workspaces.goBack")}`} placement="bottom">
          <NavLink to="/app/workspaces">
            <img src={customLogo || logo} alt="juristic" className={classes.logo} />
          </NavLink>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.verDivder}
        />
        <Tooltip arrow title={`${t("workspaces.editMeta")}`} placement="bottom">
          <Button
            className={classes.buttons}
            style={{ fontSize: 15 }}
            onClick={handleOpenMeta}
          >
            {label}
          </Button>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.verDivder}
        />
        <Tooltip arrow title={`${t("workspaces.menu")}`} placement="bottom">
          <IconButton className={classes.buttons} onClick={handleOpenMenu}>
            <MenuIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
        {!timeline && <Tooltip arrow title={`${t("workspaces.settings")}`} placement="bottom">
          <IconButton
            ref={anchorRefSettings}
            className={classes.buttons}
            onClick={handleToggleSettings}
          >
            <SettingsIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>}
        <Tooltip arrow title={`${t("workspaces.export")}`} placement="bottom">
          <IconButton
            ref={anchorRefexport}
            className={classes.buttons}
            onClick={handleToggleExports}
          >
            <SystemUpdateAltIcon className={classes.buttons} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`${t("workspaces.search")}`} placement="bottom">
          <span>
            <IconButton className={classes.buttons} disabled>
              <SearchIcon className={classes.buttons} />
            </IconButton>
          </span>
        </Tooltip>
      </Paper>
      <Popper
        open={settingsOpen}
        anchorEl={anchorRefSettings.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000, marginTop: 10 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={4} style={{ backgroundColor: "#fcfcfc" }}>
              <ClickAwayListener onClickAway={handleCloseSettings}>
                <MenuList autoFocusItem={settingsOpen}>
                  {setSnapToGrid && <MenuItem
                    className={classes.menuItem}
                    onClick={toggleSnapToGrid}
                  >
                    <ListItemIcon>
                      <BorderOuterIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      {t("flow.pane_context_menu.snap")}
                    </ListItemText>
                    <CustomSwitch checked={snapToGrid} name="showGrid" />
                  </MenuItem>}
                  <MenuItem
                    className={classes.menuItem}
                    onClick={handleVisabilityChange}
                  >
                    <ListItemIcon>
                      <GridOnIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      {t("flow.pane_context_menu.show_grid")}
                    </ListItemText>
                    <CustomSwitch checked={handleVisability} name="showGrid" />
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={handleToggleShortCuts}
                  >
                    <ListItemIcon>
                      <KeyboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.open_shotcuts")}</ListItemText>
                  </MenuItem>
                  {handleAutoLayout && <MenuItem
                    className={classes.menuItem}
                    onClick={handleAutoLayout}
                  >
                    <ListItemIcon>
                      <AccountTreeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.beautify")}</ListItemText>
                  </MenuItem>}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Popper
        open={exportOpen}
        anchorEl={anchorRefexport.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000, marginTop: 10 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={4} style={{ backgroundColor: "#fcfcfc" }}>
              <ClickAwayListener onClickAway={handleCloseExports}>
                <MenuList autoFocusItem={settingsOpen}>
                  <MenuItem
                    className={classes.menuItem}
                    disabled={loadingImg}
                    onClick={() => handleExport("image")}
                  >
                    <ListItemIcon>
                      {loadingImg ? <CircularProgress size={25} />
                        : <ImageIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.picture")}</ListItemText>
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    disabled={loadingPdf}
                    onClick={() => handleExport("pdf")}
                  >
                    <ListItemIcon>
                      {loadingPdf ? <CircularProgress size={25} /> : <PictureAsPdfIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.pdf")}</ListItemText>
                  </MenuItem>

                  {!timeline && <MenuItem className={classes.menuItem} onClick={handleExcel} disabled={loadingExcel}>
                    <ListItemIcon>
                      {loadingExcel ? <CircularProgress size={25} /> : <img
                        src={excel}
                        alt="juristic"
                        style={{ width: 18, height: 18 }}
                      />}
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.excel")}</ListItemText>
                  </MenuItem>}

                  {!timeline && <MenuItem className={classes.menuItem} onClick={handlePowerpoint}>
                    <ListItemIcon>
                      {loadingPp ? <CircularProgress size={25} /> : <img
                        src={powerpoint}
                        alt="juristic"
                        style={{ width: 18, height: 18 }}
                      />}
                    </ListItemIcon>
                    <ListItemText>{t("workspaces.power_point")}</ListItemText>
                  </MenuItem>}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Shortcuts open={showShortCuts} handleClose={handleCloseShortcuts} />
    </>
  );
};

export default Meta;
