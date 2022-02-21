/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import React from "react";
import dk from "@images/countries/dk.svg";
import no from "@images/countries/no.svg";
import se from "@images/countries/se.svg";
import fi from "@images/countries/fi.svg";

export const countryDropDown = planId => [
  {
    value: "DK",
    label: (
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={dk}
          alt="Denmark"
          style={{
            height: 20,
            width: 25,
            marginRight: 10
          }}
        />
        <span>Danmark</span>
      </div>
    )
  },
  {
    value: "SE",
    label: (
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={se}
          alt="Sverige"
          style={{
            height: 20,
            width: 25,
            marginRight: 10
          }}
        />
        <span>Sverige</span>
      </div>
    ),
    isDisabled: planId === 1
  },
  {
    value: "NO",
    label: (
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={no}
          alt="Norge"
          style={{
            height: 20,
            width: 25,
            marginRight: 10
          }}
        />
        <span>Norge</span>
      </div>
    ),
    isDisabled: planId === 1
  },
  {
    value: "FI",
    label: (
      <div style={{ width: "100%", height: "100%" }}>
        <img
          src={fi}
          alt="Finland"
          style={{
            height: 20,
            width: 25,
            marginRight: 10
          }}
        />
        <span>Finland</span>
      </div>
    ),
    isDisabled: planId === 1
  }
];
