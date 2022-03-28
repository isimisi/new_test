/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import {
  MixedTagOptions,
  TagCleanOption,
  TagSelectOption
} from "@customTypes/reducers/tags";
import React from "react";

export const tagMapping = (tag: MixedTagOptions): TagSelectOption => {
  if ("name" in tag) {
    return {
      value: tag.name,
      label: (
        <div
          style={{ width: "100%", height: "100%" }}
          data-emoji={tag.emoji}
          data-id={tag.id}
        >
          <span style={{ paddingRight: "5px" }}>
            {tag.emoji}
            {' '}
            {tag.name}
          </span>
        </div>
      )
    };
  }
  return tag;
};

export const hanldeOnChange = (newValue, meta, changeTags, tags) => {
  switch (meta.action) {
    case "select-option":
      const tag: TagCleanOption = {
        id: meta.option.label.props["data-id"],
        emoji: meta.option.label.props["data-emoji"],
        name: meta.option.value
      };

      changeTags([...tags, tag]);
      break;
    case "create-option":
      const newTag = newValue[newValue.length - 1];
      changeTags([...tags, newTag]);
      break;
    case "remove-value":
    case "pop-value":
    case "deselect-option":
      if (meta.removedValue.__isNew__) {
        changeTags(
          tags.filter(t => {
            if ("__isNew__" in t) {
              return t.value !== meta.removedValue.value;
            }
            return true;
          })
        );
      } else {
        changeTags(
          tags.filter(t => {
            if ("emoji" in t) {
              return t.id !== meta.removedValue.label.props["data-id"];
            }
            return true;
          })
        );
      }

      break;
    case "clear":
      changeTags([]);
      break;
  }
};
