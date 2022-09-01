import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";

export const nonValueArray = ["exists", "does not exist", "any"];

export const columns = (t) => [
  {
    name: t("conditions.table_title"),
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
            (tag) => `${tag.tag.emoji ? tag.tag.emoji : ""} ${tag.tag.name}`
          );
          return !filters.every((tag) => mappedTags.includes(tag));
        }
      },
      sort: false,
      customBodyRender: (tags) =>
        Array.isArray(tags) &&
        tags.map((tag) => (
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
    name: t("conditions.table_groups"),
    options: {
      filter: true
    }
  },
  {
    name: t("conditions.table_see_conditions"),
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link
          to={`/app/conditions/${value}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary">
            {`${t("conditions.btn_open")}`}
          </Button>
        </Link>
      )
    }
  },
  {
    name: t("conditions.last_changed"),
    options: {
      filter: true
    }
  }
];

export const reducer = "conditions";

export const andOrOption = [{ label: "All" }, { label: "At Least One" }].map(
  (suggestion) => ({
    value: suggestion.label,
    label: suggestion.label
  })
);

export const buildTypeOptions = [
  { label: "Node Title" },
  { label: "Node Attribut" },
  { label: "Node Description" },
  { label: "Relationship Label" }
  // { label: 'All (AND)' },
  // { label: 'At Least One (OR)' },
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label
}));

export const comparisonsOptions = [
  { label: "is equal to" },
  { label: "is not equal to" },
  { label: "is greater than" },
  { label: "is less than" },
  { label: "exists" },
  { label: "does not exist" },
  { label: "contains" },
  { label: "does not contain" },
  { label: "any" }
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label
}));
