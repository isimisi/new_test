/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Loader from "@components/Loading/LongLoader";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import axios from "axios";
import { selectStyles } from "@api/ui/helper";
import { baseUrl } from "@api/constants";
import { useTranslation } from "react-i18next";
import { countryDropDown, getCountryOptions } from "@helpers/countryOptions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import UncertainCompanies from "../Workspace/Modals/UncertainCompanies";
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId } from "@helpers/userInfo";

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
    mapUncertainCompanies,
  } = props;
  const [textField, setTextField] = useState("");
  const [countries, setCountries] = useState([]);
  const [companyMapping, setCompanyMapping] = useState(
    uncertainCompanies?.reduce(
      (obj, item) => ({
        ...obj,
        [item.soughtAfterName]: {
          id: item.id,
          name: item.name,
          orgGuessedName: item.name,
        },
      }),
      {}
    )
  );
  const user = useAuth0().user;

  useEffect(() => {
    setCompanyMapping(
      uncertainCompanies?.reduce(
        (obj, item) => ({
          ...obj,
          [item.soughtAfterName]: {
            id: item.id,
            name: item.name,
            orgGuessedName: item.name,
          },
        }),
        {}
      )
    );
  }, [uncertainCompanies]);

  const changeTextField = (e) => {
    setTextField(e.value);
  };

  const confirm = () => {
    if (uncertainCompanies?.length > 0) {
      mapUncertainCompanies(companyMapping);
      changeUncertainCompanies();
      setCompanyMapping({});
    } else if (textField.includes("DK") && textField.length < 12) {
      onConfirm(textField.substring(2), handleClose);
    } else {
      onConfirm(textField, handleClose);
    }
  };
  const plan_id = getPlanId(user);
  const getAsyncOptions = (inputValue) =>
    axios
      .get(
        `${baseUrl}/workspaces/cvr/dropdown?q=${inputValue}
    &countries=${
      plan_id === 1
        ? JSON.stringify(["DK"])
        : countries.length > 0
        ? JSON.stringify(countries.map((x) => x.value))
        : JSON.stringify(["DK", "SE", "NO", "FI", "GB"])
    }`
      )
      .then((res) => getCountryOptions(res.data));

  const handleChangeCountries = (values) => {
    setCountries(values || []);
  };

  const { t } = useTranslation();
  const countriesOptions = countryDropDown(plan_id);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        {uncertainCompanies?.length > 0 ? "Fortæl os hvad selslaberne hedder" : title}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Loader size="30%" />
        ) : uncertainCompanies?.length > 0 ? (
          <UncertainCompanies
            uncertainCompanies={companyMapping}
            getAsyncOptions={getAsyncOptions}
            changeCompany={(key, val, name) =>
              setCompanyMapping((prevVal) => {
                const prevMapping = prevVal;
                prevMapping[key].id = val;
                prevMapping[key].name = name;
                return prevMapping;
              })
            }
          />
        ) : (
          <>
            <DialogContentText>{description}</DialogContentText>
            <AsyncSelect
              styles={selectStyles()}
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="absolute"
              autoFocus
              maxMenuHeight={150}
              onChange={changeTextField}
              placeholder={t("workspaces.search_for_a_company_or_CVR_number")}
              loadOptions={getAsyncOptions}
              noOptionsMessage={() => <Typography>Her er intet at vise.</Typography>}
            />
            <Divider style={{ margin: 20 }} />
            <Select
              styles={selectStyles()}
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="absolute"
              isMulti
              inputId="react-select-single-relationship"
              placeholder="Søg kun i bestemte lande"
              options={countriesOptions}
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
  mapUncertainCompanies: PropTypes.func.isRequired,
};

export default FormDialog;
