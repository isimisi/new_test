/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form/immutable';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Help from '@material-ui/icons/Help';
import Lottie from 'lottie-react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
const lock = require('@lotties/lock.json');

interface Props {
  handleSubmit: () => void;
  pristine: boolean;
  submitting: () => void;
}

// validation functions
const required = (value?: null) => (value === null ? 'Required' : undefined);
const useStyles = makeStyles(styles);

function LockForm(props: Props) {
  const { handleSubmit, pristine, submitting } = props;

  const history = useHistory();
  const { search } = history.location;
  const classes = useStyles();
  const { t } = useTranslation();

  const firstName = new URLSearchParams(search).get('firstName');
  const lastName = new URLSearchParams(search).get('lastName');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleShowHint = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Paper
        className={classes.paperWrap}
        style={{ paddingTop: 60, paddingBottom: 60 }}
      >
        <form onSubmit={handleSubmit}>
          <section className={classes.lockWrap}>
            <Lottie
              animationData={lock}
              style={{
                width: '30%'
              }}
            />
            <div>
              <Typography className={classes.userName} variant="h4">
                {firstName}
                {' '}
                {lastName}
              </Typography>
              <div className={classes.lockForm}>
                <FormControl className={classes.lockField}>
                  <Field
                    name="securityCode"
                    component={TextFieldRedux}
                    type="password"
                    label={t('public_workspace.you_security_code')}
                    required
                    className={classes.field}
                    validate={required}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Helper Hint"
                            onClick={handleShowHint}
                          >
                            <Help />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                <Fab
                  className={classes.unlockBtn}
                  color="primary"
                  type="submit"
                  disabled={Boolean(submitting) || pristine}
                >
                  <ArrowForward style={{ color: 'white' }} />
                </Fab>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                >
                  <Typography className={classes.hint}>
                    {t('public_workspace.hint')}
                  </Typography>
                </Popover>
              </div>
            </div>
          </section>
        </form>
      </Paper>
    </div>
  );
}

const LockFormReduxed = reduxForm({
  form: 'immutableELockFrm',
  enableReinitialize: true
  // @ts-ignore
})(LockForm);

export default LockFormReduxed;
