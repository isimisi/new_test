import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const tableColumns = t => [
  {
    name: t("relationships.table_title"),
    options: {
      filter: true
    }
  },
  {
    name: t("relationships.table_desc"),
    options: {
      filter: true
    }
  },
  {
    name: t("relationships.table_groups"),
    options: {
      filter: true
    }
  },
  {
    name: t("relationships.table_see_relationships"),
    options: {
      filter: true,
      customBodyRender: value => (
        <Link
          to={`/app/relationships/${value}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary">
            {t("relationships.btn_open")}
          </Button>
        </Link>
      )
    }
  },
  {
    name: t("relationships.last_changed"),
    options: {
      filter: true
    }
  }
];

export const reducer = "relationship";

export const getSize = fontSize => {
  switch (fontSize) {
    case "1rem":
      return "Small";
    case "1.25rem":
      return "Medium";
    case "2.125rem":
      return "Large";
    default:
      return "Medium";
  }
};

export const generateLabelStyle = size => {
  switch (size) {
    case "Small":
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em"
      };
    case "Medium":
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.0075em"
      };
    case "Large":
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: "2.125rem",
        lineHeight: 1.235,
        letterSpacing: "0.00735em"
      };
    default:
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.0075em"
      };
  }
};
