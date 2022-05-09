/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { DocumentCleanOption } from "@customTypes/reducers/document";

export const columns = t => [
  {
    name: t("columns.title"),
    options: {
      filter: true
    }
  },
  {
    name: t("columns.tags"),
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
    name: t("columns.groups"),
    options: {
      filter: true
    }
  },
  {
    name: t("columns.see_document"),
    options: {
      filter: true,
      customBodyRender: value => (
        <Link to={`/app/documents/${value}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            {t("columns.btn_open")}
          </Button>
        </Link>
      )
    }
  },
  {
    name: t("columns.last_changed"),
    options: {
      filter: true
    }
  }
];

export const hanldeOnDocumentChange = (
  newValue,
  meta,
  changeDocuments,
  documents
) => {
  switch (meta.action) {
    case "select-option":
      const document: DocumentCleanOption = {
        id: meta.option.value,
        title: meta.option.label
      };

      changeDocuments([...documents, document]);
      break;
    case "create-option":
      const newDocument = newValue[newValue.length - 1];
      changeDocuments([...documents, newDocument]);
      break;
    case "remove-value":
    case "pop-value":
    case "deselect-option":
      if (meta.removedValue.__isNew__) {
        changeDocuments(
          documents.filter(t => {
            if ("__isNew__" in t) {
              return t.value !== meta.removedValue.value;
            }
            return true;
          })
        );
      } else {
        changeDocuments(
          documents.filter(t => {
            if ("id" in t) {
              return t.id !== meta.removedValue.value;
            }
            return true;
          })
        );
      }

      break;
    case "clear":
      changeDocuments([]);
      break;
  }
};

export const reducer = "document";
