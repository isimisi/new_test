/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Chip, IconButton } from "@material-ui/core";
import { PersonCleanOption } from "@customTypes/reducers/person";
import Avatar from "react-nice-avatar";
import EditIcon from "@material-ui/icons/Edit";

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
    name: t("columns.see_person"),
    options: {
      filter: true,
      customBodyRender: value => (
        <Link to={`/app/persons/${value}`} style={{ textDecoration: "none" }}>
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

export const personMapping = (
  person,
  value: boolean,
  onClick?: (e) => void,
  handleMouseOver?: (e) => void,
  handleMouseLeave?: (e) => void
) => ({
  value: person.name || person.value,
  ...("__isNew__" in person && { __isNew__: person.__isNew__ }),
  label: (
    <div
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        cursor: "pointer",
        alignItems: "center"
      }}
      className="idDiv"
      data-id={person.id || null}
      data-icon={person.icon || null}
      onClick={onClick}
    >
      {person.icon && (
        <Avatar
          style={{ width: 15, height: 15, marginRight: 5 }}
          {...JSON.parse(person.icon)}
        />
      )}

      <span style={{ paddingRight: "5px" }}>{person.name || person.label}</span>
      {value && (
        <IconButton
          color="primary"
          style={{
            borderRadius: 0
          }}
          size="small"
        >
          <EditIcon style={{ fontSize: 14 }} />
        </IconButton>
      )}
    </div>
  )
});

export const hanldeOnPersonChange = (newValue, meta, changePerson, persons) => {
  switch (meta.action) {
    case "select-option":
      const person: PersonCleanOption = {
        id: meta.option.label.props["data-id"],
        icon: meta.option.label.props["data-icon"],
        name: meta.option.value
      };

      changePerson([...persons, person]);
      break;
    case "create-option":
      const newPerson = newValue[newValue.length - 1];
      changePerson([...persons, newPerson]);
      break;
    case "remove-value":
    case "pop-value":
    case "deselect-option":
      if (meta.removedValue.__isNew__) {
        changePerson(
          persons.filter(t => {
            if ("__isNew__" in t) {
              return t.value !== meta.removedValue.value;
            }
            return true;
          })
        );
      } else {
        changePerson(
          persons.filter(t => {
            if ("icon" in t) {
              return t.id !== meta.removedValue.label.props["data-id"];
            }
            return true;
          })
        );
      }

      break;
    case "clear":
      changePerson([]);
      break;
  }
};

export const reducer = "person";
