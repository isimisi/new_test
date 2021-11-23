import React from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { Route } from 'react-router-dom';
import { ErrorWrap } from '@components';
import { useTranslation} from 'react-i18next';

const title = brand.name + ' - Page Not Found';
const description = brand.desc;

const NotFound = () => {
  const {t} = useTranslation();
  return (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
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
          <ErrorWrap title="404" desc={t('404.not_found')} />
        </div>
      );
    }}
  />
)};

export default NotFound;
