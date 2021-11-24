import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './cardStyle-jss';
import {useTranslation} from 'react-i18next';

function HorizontalNewsCard(props) {
  const {
    classes,
    thumbnail,
    title,
    desc,
    handleOpenGuide,
  } = props;
  const {t} = useTranslation();

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
