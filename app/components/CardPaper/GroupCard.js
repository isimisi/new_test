import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import classNames from "classnames";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import styles from "./cardStyle-jss";
import { useTranslation } from "react-i18next";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function GroupCard(props) {
  const {
    classes,
    image,
    title,
    description,
    list,
    width,
    detailOpen,
    deleteGroup,
  } = props;
  const { t } = useTranslation();
  return (
    <Card
      className={classNames(
        classes.cardProduct,
        isWidthUp("sm", width) && list ? classes.cardList : ""
      )}
    >
      <CardMedia className={classes.mediaProduct} image={image} title={title} />
      <CardContent className={classes.floatingButtonWrap}>
        <Typography
          noWrap
          gutterBottom
          variant="h5"
          className={classes.title}
          component="h2"
        >
          {title}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.price}>
        <div className={classes.rightAction}>
          <Button size="small" variant="outlined" color="primary" onClick={detailOpen}>
            {t("groups.group-card.see_details")}
          </Button>
        </div>
        <div className={classes.rightAction}>
          <IconButton aria-label="delete" onClick={deleteGroup} size="large">
            <DeleteIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  width: PropTypes.string.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

GroupCard.defaultProps = {
  list: false,
  detailOpen: () => false,
};

const GroupCardResponsive = withWidth()(GroupCard);
export default withStyles(styles)(GroupCardResponsive);
