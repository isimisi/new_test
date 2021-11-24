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
import {useTranslation} from 'react-i18next';

function Qna(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(null);
  const {t} = useTranslation();

  const handleChange = useCallback(panel => {
    const expandedValue = expanded !== panel ? panel : false;
    setExpanded(expandedValue);
  }, [expanded]);

  return (
    <PapperBlock title={t('help-support.faq')} whiteBg desc={t('help-support.faq_text')}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.what_is_a_red_flag?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.red_flag_expl.expl1')}
          </Typography>
          <Typography>
          {t('help-support.red_flag_expl.expl2')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.is_it_really_free?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.is_it_really_free_expl.expl1')}
          </Typography>
          <Typography>
            {t('help-support.is_it_really_free_expl.expl2')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.how_can_i_get_further_help?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.how_can_i_get_further_help_expl.expl1')}
          </Typography>
          <Typography>
            {t('help-support.how_can_i_get_further_help_expl.expl2')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.how_to_program_law?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.how_to_program_law_expl.expl1')}
          </Typography>
          <Typography>
            {t('help-support.how_to_program_law_expl.expl2')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel5'} onChange={() => handleChange('panel5')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.is_it_safe_to_use?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.is_it_safe_to_use_expl.expl1')}
          </Typography>
          <Typography>
            {t('help-support.is_it_safe_to_use_expl.expl2')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel6'} onChange={() => handleChange('panel6')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{t('help-support.why_are_not_all_features_available yet?')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography className={classes.bodyText}>
            {t('help-support.why_are_not_all_features_available yet_expl.expl1')}
          </Typography>
          <Typography>
            {t('help-support.why_are_not_all_features_available yet_expl.expl2')}
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
