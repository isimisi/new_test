import React, { useEffect } from 'react';
import brand from '@api/dummy/brand';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { showUser } from '../Users/reducers/authActions';


function PersonalDashboard() {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, []);

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


export default PersonalDashboard;
