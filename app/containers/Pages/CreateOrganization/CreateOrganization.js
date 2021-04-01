import React from 'react';
import { CreateOrganizationForm, Notification } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { createOrganization, closeNotifAction } from './reducers/createOrganizationActions';


const CreateOrganization = () => {
  const reducer = 'createOrganization';
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = values => {
    const country = values.get('country');
    const vat = values.get('vat');
    dispatch(createOrganization(vat, country, history));
  };
  const title = brand.name + ' - Register';
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
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div>
        <div>
          <CreateOrganizationForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>

  );
};

export default CreateOrganization;
