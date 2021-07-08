import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PapperBlock } from '@components';
import styles from './helpSupport-jss';

function Qna(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(null);

  const handleChange = useCallback(panel => {
    const expandedValue = expanded !== panel ? panel : false;
    setExpanded(expandedValue);
  }, [expanded]);

  return (
    <PapperBlock title="Ofte stillede spørgsmål" whiteBg desc="Vi har samlet de oftest stillede spørgsmål i en overskuelig oversigt nedenfor. Har du andre, er du naturligvis altid velkommen til at sende os en besked via kontaktformularen til højre.">
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Hvad er et red flag?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Et red flag er en særlig funktion, som kan hjælpe dig med at analysere og identificere visse juridiske problemstillinger.
          </Typography>
          <Typography>
            Red flags dukker automatisk op i dit arbejdsområde, mens du tegner - og brugere med et Draw-abonnement kan endda designe og skabe deres egne red flags.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Er det virkelig gratis?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Afhængigt af det abonnement, du har valgt, vil du have adgang til forskellige funktioner eller udgaver af Juristic.
          </Typography>
          <Typography>
            Du kan selvfølgelig altid fortsætte som gratis-bruger.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Hvordan kan jeg få yderligere hjælp?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Du er altid velkommen til at kontakte os for at få hjælp med funktioner eller din bruger. Dette gør du til højre eller via kontaktoplysningerne på vores hjemmeside.
          </Typography>
          <Typography>
            Vi svarer hurtigst muligt. Draw- og Pro-brugere har adgang til særlige supportfunktioner afhængigt af aftalen.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Hvordan programmerer man jura?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Med Juristic Draw og Juristic Pro får du adgang til en særligt udviklet funktion, som gør det muligt at 'programmere' juridisk indhold, fx red flags eller paradigmer.
          </Typography>
          <Typography>
            Det særlige er, at du hverken behøver andre programmer eller at kunne kode. Træk og slip elementer - ligesom du er vant til.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel5'} onChange={() => handleChange('panel5')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Er det sikkert at bruge?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Alle versioner af Juristic er udviklet efter sædvanlig best practice. Dermed er dine arbejdsområder, elementer m.v. altid krypteret på servere i Europa. Draw- og Pro-versionerne indeholder yderligere sikkerhedsfunktioner, som er målrettet virksomheder.
          </Typography>
          <Typography>
            Du kan læse mere om, hvordan vi behandler data i vores forrretningsbetingelser og persondatapolitik. Du kan finde begge på vores hjemmeside.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel6'} onChange={() => handleChange('panel6')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Hvorfor er ikke alle funktioner tilgængelige endnu?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            Juristic er stadig i 'beta'. Det betyder, at platformen stadig er under udvikling - og der er derfor mange flere funktioner på vej.
          </Typography>
          <Typography>
            Det betyder dog også, at du vil opleve visse fejl, som vi stadig arbejder på højtryk for at løse.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </PapperBlock>
  );
}

Qna.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Qna);
