import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AsyncSelect from 'react-select/async';
import { selectStyles } from '@api/ui/helper';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


function UncertainCompanies(props) {
  const {
    uncertainCompanies,
    getAsyncOptions,
    changeCompany
  } = props;

  const [showEdit, setShowEdit] = useState(true);
  const handleShowEdit = () => setShowEdit(prevVal => !prevVal);

  return (
    <>
      <DialogContentText>
        Vi har fundet en fejl! Der er et eller flere udenlandske selskaber, som vist ikke er registreret korrekt. Ofte er det fordi, at selskabet ikke er registreret med sit fulde navn i fx CVR. Vi har forsøgt at foretage et match for dig. Se og ret forslagene her.
      </DialogContentText>
      <Grid style={{ marginTop: 5 }} container alignItems="flex-start" direction="row">
        <Grid item md={5}>
          <Typography display="inline" variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Forkert navn/selskab
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography display="inline" variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Korrekt navn/selskab
          </Typography>
        </Grid>
      </Grid>
      {Object.keys(uncertainCompanies).map(company => (
        <Grid style={{ marginTop: 5 }} key={uncertainCompanies[company].id} container alignItems="center" direction="row" justify="space-between">
          <Grid item md={5} justify="center">
            <Typography display="inline" variant="body1" styles>
              {company}
            </Typography>
          </Grid>
          <Grid item md={6} justify="center">
            {showEdit ? (
              <Typography display="inline" variant="body1" styles>
                {uncertainCompanies[company].name}
              </Typography>
            ) : (
              <AsyncSelect
                styles={selectStyles('relative')}
                menuPlacement="auto"
                autoFocus
                maxMenuHeight={150}
                onChange={(e) => changeCompany(company, e.value, e.label)}
                placeholder="Søg efter et andet selskab"
                loadOptions={getAsyncOptions}
                noOptionsMessage={() => (
                  <Typography>
                      Her er intet at vise.
                  </Typography>
                )}
              />
            )}
          </Grid>
          <Grid item md={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color={showEdit ? 'default' : 'primary'} onClick={handleShowEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

UncertainCompanies.propTypes = {
  uncertainCompanies: PropTypes.array.isRequired,
  getAsyncOptions: PropTypes.func.isRequired,
  changeCompany: PropTypes.func.isRequired
};

export default UncertainCompanies;
