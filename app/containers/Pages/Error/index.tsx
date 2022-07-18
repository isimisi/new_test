import React from "react";
import { Helmet } from "react-helmet";
import brand from "@api/ui/brand";
import { Route } from "react-router-dom";
import ErrorWrap from "@components/Error/ErrorWrap";
import { useTranslation } from "react-i18next";

const title = brand.name + " - Aplication Error";
const description = brand.desc;

const Error = () => {
  const { t } = useTranslation();
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          // @ts-ignore
          staticContext.status = 404; // eslint-disable-line
        }
        return (
          <div>
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="twitter:title" content={title} />
              <meta property="twitter:description" content={description} />
            </Helmet>
            <ErrorWrap desc={t("error.server_goes_wrong")} />
          </div>
        );
      }}
    />
  );
};

export default Error;
