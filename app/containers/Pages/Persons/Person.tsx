import React, { useEffect, useState } from "react";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { encryptId, getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";

const Person = () => {
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const history = useHistory();
  const id = getId(history) as string;

  const { t } = useTranslation();

  return <div />;
};

export default Person;
