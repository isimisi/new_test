import React from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';

function Settings() {
  const title = brand.name;
  const description = brand.desc;

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

    </div>
  );
}

export default Settings;
