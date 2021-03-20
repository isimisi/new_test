import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tag } from 'react-trello';
import styles from '../TaskBoard/taskBoard-jss';

function CustomCard(props) {
  const {
    classes,
    title,
    label,
    description,
    tags,
  } = props;
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.label}>{label}</div>
      </header>
      {tags !== [] && <div className={classes.tags}>{tags.map((tag, index) => <Tag key={index.toString()} {...tag} />)}</div>}
      <div className={classes.content}>
        {description}
      </div>
    </div>
  );
}

CustomCard.propTypes = {
  tags: PropTypes.array,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string
};


CustomCard.defaultProps = {
  tags: [],
  label: '',
  description: '',
  onDragStart: null
};

export default withStyles(styles)(CustomCard);
