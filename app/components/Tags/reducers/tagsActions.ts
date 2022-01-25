/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from "axios";
import { baseUrl, authHeader, genericErrorMessage } from "@api/constants";
import { AppDispatch, AppThunk } from "@redux/configureStore";
import { WhereInApp } from "@customTypes/data";
import * as types from "./tagsConstants";
import { User } from "@auth0/auth0-react";
const TAGS = "tags";

export const getTags = (user: User, where: WhereInApp): AppThunk => async (
  dispatch: AppDispatch
): Promise<void> => {
  const url = `${baseUrl}/${TAGS}?where=${where}`;
  const header = authHeader(user);
  try {
    const response = await axios.get(url, header);
    const tags = response.data;
    tags.active = false;
    dispatch({ type: types.TAG_INDEX_SUCCESS, tags });
  } catch (error) {
    dispatch({ type: types.TAG_INDEX_FAILED, genericErrorMessage });
  }
};

export const postTag = (
  user: User,
  emoji: string,
  emoji_name: string,
  name: string
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  const url = `${baseUrl}/${TAGS}`;
  const body = {
    emoji,
    emoji_name,
    name,
  };
  const header = authHeader(user);
  try {
    const response = await axios.post(url, body, header);
    const tag = response.data;
    dispatch({ type: types.TAG_POST_SUCCESS, tag });
  } catch (error) {
    dispatch({ type: types.TAG_POST_FAILED, genericErrorMessage });
  }
};

export const updateTag = (
  user: User,
  id: string,
  emoji: string | undefined,
  emoji_name: string | undefined,
  name: string
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  const url = `${baseUrl}/${TAGS}/${id}`;
  const body = {
    emoji,
    emoji_name,
    name,
  };
  const header = authHeader(user);
  try {
    const response = await axios.put(url, body, header);
    const tag = response.data;
    dispatch({ type: types.TAG_UPDATE_SUCCESS, tag });
  } catch (error) {
    dispatch({ type: types.TAG_UPDATE_FAILED, genericErrorMessage });
  }
};

export const deleteTag = (user: User, id: string): AppThunk => async (
  dispatch: AppDispatch
): Promise<void> => {
  const url = `${baseUrl}/${TAGS}/${id}`;
  const header = authHeader(user);
  try {
    await axios.delete(url, header);

    dispatch({ type: types.TAG_DELETE_SUCCESS, id });
  } catch (error) {
    dispatch({ type: types.TAG_DELETE_FAILED, genericErrorMessage });
  }
};

export const changeTagActivity = (tag) => ({
  type: types.CHANGE_TAGS_ACTIVE,
  tag,
});
