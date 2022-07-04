import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import guideData from '@api/dummy/guideData';
import styles from './guide-jss';
import { useTranslation } from 'react-i18next';
import guideSteps from '../../api/dummy/guideData';

const maxStepsSwipe = guideData.length;

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

function GuideSlider(props) {
  const [activeStepSwipe, setActiveStepSwipe] = useState(0);
  
  const {t} = useTranslation();
  const guideData = guideSteps(t);
  const maxStepsSwipe = guideData.length;

  const handleNextSwipe = () => {
    setActiveStepSwipe(activeStepSwipe + 1);
  };

  const handleBackSwipe = () => {
    setActiveStepSwipe(activeStepSwipe - 1);
  };

  const handleStepChangeSwipe = index => {
    setActiveStepSwipe(index);
  };

  const handleClose = () => {
    const { closeGuide } = props;
    closeGuide();
    setActiveStepSwipe(0);
  };

  const {
    classes,
    theme,
    openGuide,
    closeGuide
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={openGuide}
      onClose={closeGuide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogContent className={classes.rootContent}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStepSwipe}
          onChangeIndex={handleStepChangeSwipe}
          enableMouseEvents
          className={classes.guideWrap}
        >
          {guideData.map((step, index) => (
            <div className={classes.figure} key={index.toString()}>
              <img key={step.label} className={classes.img} src={step.imgPath} alt={step.title} />
            </div>
          ))}
        </SwipeableViews>
        <article className={classes.text}>
          <Typography variant="h6">{guideData[activeStepSwipe].title}</Typography>
          <Typography>{guideData[activeStepSwipe].label}</Typography>
        </article>
        <MobileStepper
          variant="progress"
          steps={maxStepsSwipe}
          position="static"
          activeStep={activeStepSwipe}
          className={classes.mobileStepper}
          nextButton={
            activeStepSwipe === maxStepsSwipe - 1 ? (
              <Button size="small" color="primary" onClick={handleClose}>
                {t('guide-slider.exit')}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            ) : (
              <Button size="small" onClick={handleNextSwipe}>
                {t('guide-slider.continue')}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )
          }
          backButton={(
            <Button size="small" onClick={handleBackSwipe} disabled={activeStepSwipe === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {t('guide-slider.back')}
            </Button>
          )}
        />
      </DialogContent>
    </Dialog>
  );
}

GuideSlider.propTypes = {
  openGuide: PropTypes.bool.isRequired,
  closeGuide: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(GuideSlider);
