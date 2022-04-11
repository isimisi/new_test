import React from "react";
import { DataGrid, GridColumns, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColumns = [
  { field: "title", headerName: "Title", editable: true },
  { field: "description", headerName: "Description", editable: true },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    editable: true
  },
  {
    field: "persons",
    headerName: "Persons",
    type: "singleSelect",
    valueOptions: ["test", "test2"],
    editable: true
  },
  {
    field: "documents",
    headerName: "Documents",
    type: "singleSelect",
    valueOptions: ["test", "test2"],
    editable: true
  },
  {
    field: "tags",
    headerName: "Tags",
    type: "singleSelect",
    valueOptions: ["test", "test2"],
    editable: true
  }
];

const rows: GridRowsProp = [
  {
    id: 1,
    title: "tets",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam placeat molestias officiis quo vel unde quis incidunt, velit deleniti similique numquam. Iste consequatur laborum eligendi ratione repellendus possimus nostrum nam.",

    persons: "test",
    documents: "test",
    tags: "test"
  }
];

const Table = () => {
  const test = "";
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        checkboxSelection
      />
    </div>
  );
};

export default Table;
