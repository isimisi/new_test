/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import useStyles from './error.jss';
const notFound = require('@lotties/notFound.json');


interface Props {
  desc: any;
}

const ErrorWrap = (props: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
        // @ts-ignore
        staticContext.status = 404; // eslint-disable-line 
        }
        const { desc } = props;
        return (
          <div className={classes.errorWrap}>
            <Lottie animationData={notFound} className={classes.lottie} />
            <Typography variant="h6">{desc}</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/app/"
            >
              {t('404.btn_return_to_home_page')}
            </Button>
          </div>
        );
      }}
    />
  );
};

export default ErrorWrap;
