/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from "@components/Loading/LongLoader";
import { useTranslation } from "react-i18next";
import styles from "./cardStyle-jss";

function PricingCard(props) {
  const {
    classes,
    title,
    price,
    tier,
    onClick,
    active,
    included,
    loading,
  } = props;

  const getTier = (lv) => {
    switch (lv) {
      case "expensive":
        return classes.expensive;
      case "more-expensive":
        return classes.moreExpensive;
      default:
        return classes.free;
    }
  };
  const { t } = useTranslation();

  const lite = [
    t("choose-plan.load_from_cvr"),
    t("choose-plan.download_accounting_data"),
    t("choose-plan.change_data_from_CVR"),
    t("choose-plan.add_content"),
    t("choose-plan.automatic_red_flags"),
  ];

  const team = [
    t("choose-plan.secure_company_login"),
    t("choose-plan.design_your_own_red_flags"),
    t("choose-plan.design_your_own_content"),
    t("choose-plan.integrate_other_APIs"),
    t("choose-plan.own_subdomain"),
    t("choose-plan.vpn_lock"),
  ];
  const pro = [
    t("choose-plan.automatic_learning_content"),
    t("choose-plan.automatic_report_builde"),
  ];

  const features = [...lite, ...team, ...pro];

  const getTierForWorkspaces = (lv) => {
    if (lv === "free") {
      return 50;
    }
    return t("choose-plan.unlimited");
  };

  const getTierForChecks = (lv) => {
    switch (lv) {
      case "expensive":
        return [...lite, ...team];
      case "more-expensive":
        return features;
      default:
        return lite;
    }
  };

  return (
    <div>
      <Card className={classNames(classes.priceCard, getTier(tier))}>
        <div className={classes.priceHead}>
          <Typography variant="h5">{title}</Typography>
          <Typography component="h4" variant="h3">
            {price}
          </Typography>
          {title !== "Pro" && (
            <Typography>{t("choose-plan.excl_vat")}</Typography>
          )}
        </div>
        <CardContent className={classes.featureList}>
          <List dense>
            <ListItem>
              <ListItemText primary={t("choose-plan.workspaces")} />
              <ListItemSecondaryAction>
                <Typography style={{ marginRight: 10 }}>
                  {getTierForWorkspaces(tier)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            {features.map((item, index) => (
              <ListItem key={index.toString()}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <Checkbox
                    style={{ color: "white" }}
                    checked={getTierForChecks(tier).includes(item)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className={classes.btnArea}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              variant={active ? "contained" : "outlined"}
              disabled={active || included}
              size="large"
              className={classes.lightButton}
              onClick={() => onClick()}
            >
              {included
                ? t("choose-plan.btn_included")
                : active
                ? t("choose-plan.current")
                : title === "Pro" || title === "Draw"
                ? t("choose-plan.order_a_demo")
                : t("choose-plan.get_it_now")}
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

PricingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  included: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withStyles(styles)(PricingCard);
