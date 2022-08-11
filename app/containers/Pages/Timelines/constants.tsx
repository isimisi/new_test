import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import moment from "moment";

export const getDate = (date, t) =>
  moment(date).isValid()
    ? `${moment(date).format("DD/MM-YYYY")}${
      moment(date).format("HH:mm") === "00:00" ? "" : ", kl."
    } ${
      moment(date).format("HH:mm") === "00:00"
        ? ""
        : moment(date).format("HH:mm")
    }`
    : t("node.no_date");

export const timelineNodeDimensions = {
  width: 240,
  height: 83
};

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string | undefined, email: string) {
  if (!name) {
    return { children: email[0] };
  }

  return {
    children: `${name.split(" ")[0][0]}${
      name.split(" ")[name.split(" ").length - 1][0]
    }`
  };
}

export const columns = t => [
  {
    name: t("columns.title"),
    options: {
      filter: true
    }
  },
  {
    name: t("workspaces.table_desc"),
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
    name: t("columns.see_timeline"),
    options: {
      filter: true,
      customBodyRender: value => (
        <Link to={`/app/timelines/${value}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            {t("columns.btn_open")}
          </Button>
        </Link>
      )
    }
  },
  {
    name: t("workspaces.table_created"),
    options: {
      filter: true
    }
  },
  {
    name: t("workspaces.last_changed"),
    options: {
      filter: true
    }
  }
];

export const reducer = "timeline";
