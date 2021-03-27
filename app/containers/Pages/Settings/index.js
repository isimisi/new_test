import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import settingList from '@api/ui/settingList';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import dummy from '@api/dummy/dummyContents';
import DetailSettings from './DetailSettings';
import styles from './settings-jss';

function Settings(props) {
  const title = brand.name;
  const description = brand.desc;
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [settingTitle, setSettingTitle] = useState('Settings');

  const handleClickOpen = (newTitle) => {
    setOpen(true);
    setSettingTitle(newTitle);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = event => {
    setKeyword(event.target.value.toLowerCase());
  };

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

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
