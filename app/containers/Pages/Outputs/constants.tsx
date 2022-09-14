/* eslint-disable no-plusplus */
import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Link } from "react-router-dom";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlDocx from "html-docx-js/dist/html-docx";
import Chip from "@material-ui/core/Chip";

const downloadFile = (label, file) => {
  const data = Uint8Array.from(file.Body.data);
  const content = new Blob([data], { type: file.ContentType });

  const encodedUri = window.URL.createObjectURL(content);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", file.Metadata.file_type ? `${label}.${file.Metadata.file_type}` : label);

  link.click();
};

export const columns = [
  {
    name: "Title",
    options: {
      filter: true
    }
  },
  {
    name: "Description",
    options: {
      filter: true
    }
  },
  {
    name: "Tags",
    options: {
      filter: false,
      filterList: [],
      filterOptions: {
        logic: (tags, filters) => {
          const mappedTags = tags.map(
            tag => `${tag.tag.emoji ? tag.tag.emoji : ""} ${tag.tag.name}`
          );
          return !filters.every(tag => mappedTags.includes(tag));
        }
      },
      sort: false,
      customBodyRender: tags =>
        Array.isArray(tags) &&
        tags.map(tag => (
          <Chip
            key={tag.id}
            style={{ margin: 2 }}
            size="small"
            label={`${tag.tag.emoji ? tag.tag.emoji : ""} ${tag.tag.name}`}
          />
        ))
    }
  },
  {
    name: "Group",
    options: {
      filter: true
    }
  },
  {
    name: "See Output",
    options: {
      filter: true,
      customBodyRender: value => (
        <Link to={`/app/outputs/${value}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Open
          </Button>
        </Link>
      )
    }
  },
  {
    name: "Download",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta) => (
        <IconButton
          disabled={!value}
          color="primary"
          aria-label="download file"
          component="span"
          onClick={() => downloadFile(tableMeta.rowData[0], value)}
        >
          <CloudDownloadIcon style={{ color: value ? "black" : "gray" }} />
        </IconButton>
      )
    }
  },
  {
    name: "Last edited",
    options: {
      filter: true
    }
  }
];

export const reducer = "output";

export const fromDraftToDocx = editorState => {
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const converted = htmlDocx.asBlob(html);
  const convertedFile = new File([converted], "name");
  Object.assign(convertedFile, {
    preview: URL.createObjectURL(convertedFile)
  });
  return convertedFile;
};
