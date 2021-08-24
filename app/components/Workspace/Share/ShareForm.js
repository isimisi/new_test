import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import css from '@styles/Form.scss';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../workspace-jss';

const ShareForm = (props) => {
  const {
    classes,
    close,
    firstName,
    onFirstNameChange,
    lastName,
    onLastNameChange,
    email,
    onEmailChange,
    phone,
    onPhoneChange,
    editable,
    onEditableChange,
    onShare,
    clearInput
  } = props;
  const [changeGroup, setChangeGroup] = useState(false);
  const onChangeGroup = () => setChangeGroup(prev => !prev);
  const filled = firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && phone.length !== 0;


  return (
    <div>
      <section className={css.bodyForm}>
        <Typography variant="caption">
            Vær opmærksom på, at hvis du delere dit arbejdsområde er det tilgængeligt for alle, der er i besidelse af den autogeneret koder. Så du skal stole på de mennekser, du deler arbejdsområdet med, hvis arbejdsområdet indenholder sensitiv data.
        </Typography>

        <div>
          <TextField
            name="firstName"
            placeholder="Fornavn"
            label="Fornavn"
            className={classes.field}
            value={firstName}
            onChange={onFirstNameChange}
          />
        </div>
        <div>
          <TextField
            name="lastName"
            placeholder="Efternavn"
            label="Efternavn"
            className={classes.field}
            value={lastName}
            onChange={onLastNameChange}
          />
        </div>
        <div>
          <TextField
            name="email"
            placeholder="Email"
            label="Email"
            className={classes.field}
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div>
          <TextField
            name="phone"
            placeholder="Telefonnummer"
            label="Telefonnummer"
            className={classes.field}
            value={phone}
            onChange={onPhoneChange}
          />
        </div>
        <div className={classes.row} style={{ marginTop: 10 }}>
          <Checkbox
            name="editable"
            color="primary"
            checked={editable}
            onChange={onEditableChange}
          />
          <Typography variant="subtitle2">
                Skal brugeren kunne redigere i arbejdsområdet?
          </Typography>
        </div>
        <Typography variant="caption">
            Når du deler dit arbejdsområde, med eksterne brugere, så ændre vi din gruppe til "Ekstern" af sikkerhedsmæssige årsager. Når den er ændret vil den ikke kunne ændres tilbage igen.
        </Typography>
        <div className={classes.row}>
          <Checkbox
            name="changeGroup"
            color="primary"
            checked={changeGroup}
            onChange={onChangeGroup}
          />
          <Typography variant="subtitle2" style={{ marginTop: 5 }}>
                Jeg accepterer, at arbejdsområdets gruppe ændres til "Ekstern" og, at jeg ikke kan ændre den tilbage igen.
          </Typography>
        </div>
      </section>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => close()}>
            Annuller
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          disabled={!changeGroup || !filled}
          onClick={() => {
            clearInput();
            onShare(firstName, lastName, email, phone, editable);
            onChangeGroup();
          }}
        >
            Del
        </Button>
      </div>
    </div>
  );
};


ShareForm.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  onFirstNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  onLastNameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  editable: PropTypes.string.isRequired,
  onEditableChange: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired
};


export default withStyles(styles)(ShareForm);
