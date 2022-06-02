/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowsProp
} from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";
import { FlowElement } from "react-flow-renderer";
import Dialog from "@material-ui/core/Dialog";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../timeline.jss";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "@api/ui/helper";
import {
  hanldeOnPersonChange,
  personMapping
} from "../../../containers/Pages/Persons/constants";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import { MixedDocumentOptions } from "@customTypes/reducers/document";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "react-nice-avatar";
import GridCellExpand from "@components/DataGrid/GridCellExpanded";
import GredCellExpandedWYS from "@components/DataGrid/GridCellExpandedWYS";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "tets",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam placeat molestias officiis quo vel unde quis incidunt, velit deleniti similique numquam. Iste consequatur laborum eligendi ratione repellendus possimus nostrum nam.",

    persons: [
      {
        icon:
          '{"sex": "man", "bgColor": "#9287FF", "earSize": "big", "eyeStyle": "circle", "hatColor": "#F48150", "hatStyle": "none", "faceColor": "#AC6651", "hairColor": "#000", "hairStyle": "mohawk", "noseStyle": "short", "mouthStyle": "smile", "shirtColor": "#77311D", "shirtStyle": "hoody", "eyeBrowStyle": "up", "glassesStyle": "none"}',
        id: 117,
        name: "Pernille Fredskild Thogersen"
      },
      {
        icon:
          '{"sex": "woman", "bgColor": "#E0DDFF", "earSize": "big", "eyeStyle": "smile", "hatColor": "#77311D", "hatStyle": "turban", "faceColor": "#F9C9B6", "hairColor": "#fff", "hairStyle": "womanLong", "noseStyle": "round", "mouthStyle": "smile", "shirtColor": "#F4D150", "shirtStyle": "short", "eyeBrowStyle": "upWoman", "glassesStyle": "none"}',
        id: 116,
        name: "Kean Ottesen"
      }
    ],
    documents: "test"
  },
  {
    id: 2,
    name: "tets",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam placeat molestias officiis quo vel unde quis incidunt, velit deleniti similique numquam. Iste consequatur laborum eligendi ratione repellendus possimus nostrum nam.",

    persons: [
      {
        icon:
          '{"sex": "man", "bgColor": "#9287FF", "earSize": "big", "eyeStyle": "circle", "hatColor": "#F48150", "hatStyle": "none", "faceColor": "#AC6651", "hairColor": "#000", "hairStyle": "mohawk", "noseStyle": "short", "mouthStyle": "smile", "shirtColor": "#77311D", "shirtStyle": "hoody", "eyeBrowStyle": "up", "glassesStyle": "none"}',
        id: 117,
        name: "Pernille Fredskild Thogersen"
      },
      {
        icon:
          '{"sex": "woman", "bgColor": "#E0DDFF", "earSize": "big", "eyeStyle": "smile", "hatColor": "#77311D", "hatStyle": "turban", "faceColor": "#F9C9B6", "hairColor": "#fff", "hairStyle": "womanLong", "noseStyle": "round", "mouthStyle": "smile", "shirtColor": "#F4D150", "shirtStyle": "short", "eyeBrowStyle": "upWoman", "glassesStyle": "none"}',
        id: 116,
        name: "Kean Ottesen"
      }
    ],
    documents: "test"
  }
];

interface Props {
  close: (bool?: boolean) => void;
  open: boolean;
  elements: FlowElement[];
  personOptions: MixedPersonOptions[];
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

function renderCellExpandWYS(params) {
  return (
    <GredCellExpandedWYS
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

const Table = (props: Props) => {
  const { open, close, elements, personOptions } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClose = () => {
    close(false);
  };

  const handleOpenPerson = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    // openPerson(id, nameSpan.innerHTML);
  };

  const handleOpenDocument = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    // openDocument(id, nameSpan.innerHTML);
  };

  const handleSave = () => {
    // onSave();
  };

  const [openMenuOnClick, setopenMenuOnClick] = useState(true);

  const handleMouseOverValue = () => {
    setopenMenuOnClick(false);
  };

  const handleMouseLeaveValue = () => {
    setopenMenuOnClick(true);
  };

  const handleChangePersons = (p: MixedPersonOptions[]) => {
    // changeTimelineNode("persons", p);
  };

  const handleChangeDocuments = (p: MixedDocumentOptions[]) => {
    // changeTimelineNode("documents", p);
  };

  const columns: GridColumns = [
    {
      field: "date",
      headerName: "Date",
      type: "date",
      editable: true,
      flex: 1
    },
    {
      field: "name",
      headerName: "Navn",
      editable: true,
      flex: 1,
      renderCell: renderCellExpand
    },

    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 1,
      renderCell: renderCellExpand
    },
    {
      field: "content",
      headerName: "Indhold",
      editable: true,
      flex: 1,
      renderCell: renderCellExpandWYS,
      renderEditCell: params => (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button variant="contained" color="secondary">
            Rediger indhold
          </Button>
        </div>
      )
    },
    {
      field: "persons",
      headerName: "Persons",
      resizable: true,
      renderCell: cellValues => (
        <div className={classes.personDiv}>
          {// @ts-ignore
            cellValues.value.map(person => (
              <Tooltip arrow title={person.name} placement="top">
                <div
                  style={{ cursor: "pointer", margin: 2 }}
                  onClick={handleOpenPerson}
                >
                  <Avatar
                    style={{ width: 30, height: 30 }}
                    {...JSON.parse(person.icon)}
                  />
                </div>
              </Tooltip>
            ))}
        </div>
      ),
      renderEditCell: params => {
        console.log(params);
        return (
          <div>
            <CreatableSelect
              isMulti
              styles={{
                ...selectStyles(),
                container: (provided, state) => ({
                  ...provided,
                  width: `${params.colDef.computedWidth - 2}px`,
                  lineHeight: "37px"
                }),
                control: (provided, state) => ({
                  ...provided,
                  borderWidth: 0
                }),
                valueContainer: (provided, state) => ({
                  ...provided,
                  flexWrap: "nowrap"
                }),
                multiValue: (provided, state) => ({
                  ...provided,
                  minWidth: "30%"
                })
              }}
              value={[
                { value: "purple", label: "Purple", color: "#5243AA" },
                { value: "red", label: "Red", color: "#FF5630", isFixed: true },
                { value: "yellow", label: "Yellow", color: "#FFC400" },
                { value: "green", label: "Green", color: "#36B37E" },
                { value: "forest", label: "Forest", color: "#00875A" }
              ]}
              options={[
                {
                  value: "ocean",
                  label: "Ocean",
                  color: "#00B8D9",
                  isFixed: true
                },
                {
                  value: "blue",
                  label: "Blue",
                  color: "#0052CC",
                  isDisabled: true
                },
                { value: "purple", label: "Purple", color: "#5243AA" },
                { value: "red", label: "Red", color: "#FF5630", isFixed: true },
                { value: "orange", label: "Orange", color: "#FF8B00" },
                { value: "yellow", label: "Yellow", color: "#FFC400" },
                { value: "green", label: "Green", color: "#36B37E" },
                { value: "forest", label: "Forest", color: "#00875A" },
                { value: "slate", label: "Slate", color: "#253858" },
                { value: "silver", label: "Silver", color: "#666666" }
              ]}
            />
          </div>
        );
      },
      editable: true,
      flex: 1
    },
    {
      field: "documents",
      headerName: "Documents",
      renderCell: cellValues => (
        <Button
          variant="contained"
          color="primary"
          onClick={event => {
            console.log(event, cellValues);
          }}
        >
          Print
        </Button>
      ),
      editable: true,
      flex: 1
    }
  ];

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" className={classes.tableTitle}>
            {t("timeline.table_header")}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DataGrid
        checkboxSelection
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        editMode="row"
      />
    </Dialog>
  );
};

export default Table;
