import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core/styles";


const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownLang, setDropdownLang] = useState(i18n.language || 'en');

  const languageHandler = event => {
    const newLanguage = event.target.value;
    if (dropdownLang !== newLanguage) {
      setDropdownLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 20,
      border: 0
    },
    Select: {
      border: 0,
      backgroundColor: 'transparent'
    },
    menuItem: {
      maxHeight: 50,
      border: 0
    },
  }));

  // });
  
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} >
      <Select value={dropdownLang} onChange={languageHandler} className={classes.Select} selected>
        <MenuItem className={classes.menuItem} value="da">DK</MenuItem>
        <MenuItem className={classes.menuItem} value="en">EN</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;