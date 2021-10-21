import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Loader from '@api/ui/Loader';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import axios from 'axios';
import { selectStyles } from '@api/ui/helper';
import { baseUrl } from '@api/constants';
import dk from '@api/images/countries/dk.svg';
import no from '@api/images/countries/no.svg';
import se from '@api/images/countries/se.svg';
import fi from '@api/images/countries/fi.svg';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import UncertainCompanies from '../Workspace/UncertainCompanies';


const countryDropDown = [
  {
    value: 'DK',
    label: (
      <div style={{ width: '100%', height: '100%' }}>
        <img
          src={dk}
          alt="Denmark"
          style={{
            height: 20, width: 25, marginRight: 10
          }}
        />
        <span>Danmark</span>
      </div>
    ),
  },
  {
    value: 'SE',
    label: (
      <div style={{ width: '100%', height: '100%' }}>
        <img
          src={se}
          alt="Sverige"
          style={{
            height: 20, width: 25, marginRight: 10
          }}
        />
        <span>Sverige</span>
      </div>
    ),
  },
  {
    value: 'NO',
    label: (
      <div style={{ width: '100%', height: '100%' }}>
        <img
          src={no}
          alt="Norge"
          style={{
            height: 20, width: 25, marginRight: 10
          }}
        />
        <span>Norge</span>
      </div>
    ),
  },
  {
    value: 'FI',
    label: (
      <div style={{ width: '100%', height: '100%' }}>
        <img
          src={fi}
          alt="Finland"
          style={{
            height: 20, width: 25, marginRight: 10
          }}
        />
        <span>Finland</span>
      </div>
    ),
  }

];

const FormDialog = (props) => {
  const {
    handleClose,
    open,
    title,
    description,
    onConfirm,
    loading,
    uncertainCompanies,
    changeUncertainCompanies,
    mapUncertainCompanies
  } = props;
  const [textField, setTextField] = useState('');
  const [countries, setCountries] = useState([]);
  const [companyMapping, setCompanyMapping] = useState(uncertainCompanies.reduce((obj, item) => ({ ...obj, [item.soughtAfterName]: { id: item.id, name: item.name, orgGuessedName: item.name } }), {}));

  useEffect(() => {
    setCompanyMapping(uncertainCompanies.reduce((obj, item) => ({ ...obj, [item.soughtAfterName]: { id: item.id, name: item.name, orgGuessedName: item.name } }), {}));
  }, [uncertainCompanies]);

  const changeTextField = (e) => {
    setTextField(e.value);
  };

  const confirm = () => {
    if (uncertainCompanies.length > 0) {
      mapUncertainCompanies(companyMapping);
      changeUncertainCompanies();
      setCompanyMapping({});
    } else if (textField.includes('DK')) {
      onConfirm(textField.substring(2), handleClose);
    } else {
      onConfirm(textField, handleClose);
    }
  };


  const getAsyncOptions = inputValue => axios
    .get(`${baseUrl}/workspaces/cvr/dropdown?q=${inputValue}
    &countries=${countries.length > 0 ? JSON.stringify(countries.map(x => x.value)) : JSON.stringify(['DK', 'SE', 'NO', 'FI'])}`)
    .then(res => res.data);

  const handleChangeCountries = (values) => {
    setCountries(values || []);
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">{uncertainCompanies.length > 0 ? 'Fortæl os hvad selslaberne hedder' : title}</DialogTitle>
      <DialogContent>
        {loading
          ? <Loader />
          : uncertainCompanies.length > 0
            ? (
              <UncertainCompanies
                uncertainCompanies={companyMapping}
                getAsyncOptions={getAsyncOptions}
                changeCompany={(key, val, name) => setCompanyMapping(prevVal => {
                  const prevMapping = prevVal;
                  prevMapping[key].id = val;
                  prevMapping[key].name = name;
                  return prevMapping;
                })}
              />
            )
            : (
              <>
                <DialogContentText>
                  {description}
                </DialogContentText>
                <AsyncSelect
                  styles={selectStyles('relative')}
                  menuPlacement="auto"
                  autoFocus
                  maxMenuHeight={150}
                  onChange={changeTextField}
                  placeholder="Navn eller CVR-nummer"
                  loadOptions={getAsyncOptions}
                  noOptionsMessage={() => (
                    <Typography>
                      Her er intet at vise.
                    </Typography>
                  )}
                />
                <Divider style={{ margin: 20 }} />
                <Select
                  styles={selectStyles('relative')}
                  isMulti
                  inputId="react-select-single-relationship"
                  placeholder="Søg kun i bestemte lande"
                  options={countryDropDown}
                  value={countries}
                  onChange={handleChangeCountries}
                />
              </>
            )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
            Afbryd
        </Button>
        <Button onClick={confirm} color="primary">
            Videre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  uncertainCompanies: PropTypes.array.isRequired,
  changeUncertainCompanies: PropTypes.func.isRequired,
  mapUncertainCompanies: PropTypes.func.isRequired
};


export default FormDialog;
