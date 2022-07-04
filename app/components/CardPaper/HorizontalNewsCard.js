import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import styles from './cardStyle-jss';

function HorizontalNewsCard(props) {
  const {
    classes,
    thumbnail,
    title,
    desc,
    handleOpenGuide,
  } = props;
  const { t } = useTranslation();

  return (
    <Card className={classes.newsList}>
      <CardContent className={classes.newsListContent}>
        <Typography noWrap gutterBottom variant="h6" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {desc}
        </Typography>
        <div className={classes.actionArea}>
          <Button size="small" color="primary" onClick={handleOpenGuide}>
            {t('personal-dashboard.HorizontalNewsCard.btn_see_guide_here')}
          </Button>
        </div>
      </CardContent>
      <CardMedia
        className={classes.mediaNews}
        image={thumbnail}
        title={title}
      />
    </Card>
  );
}

HorizontalNewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
};

export default withStyles(styles)(HorizontalNewsCard);
