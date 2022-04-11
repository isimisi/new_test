import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import moment from 'moment';
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { selectStyles } from "@api/ui/helper";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import { CompanyData, Tidslinje } from "@customTypes/reducers/workspace";
import Paper from "@material-ui/core/Paper";
import { SelectOptions } from "@customTypes/data";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Collapse from "@material-ui/core/Collapse";
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Link from "@material-ui/core/Link";


interface Props {
  companyData?: CompanyData;
  timeline?: Tidslinje[]
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
    margin: "10px 0px"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  },
  topContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  datePicker: {
    margin: 0,
    marginLeft: 20,
    minWidth: 50
  },
  filterHeader: {
    marginLeft: 20,
    marginTop: 10
  }
}));

const headerOptions = [
  "Andre ændringer eller registreringer",
  "Offentliggørelse af omstrukturering",
  "Omstrukturering gennemført",
  "Personkredsen er ændret",
  "Rettelse",
  "Selskabet er omdannet",
  "Selskabsstiftelse",
  "Uoverensstemmelse vedrørende reelle ejere",
  "Virksomhedens status er ændret",
  "Ændring af selskabskapitalen",
  "Ændring af adresse",
  "Ændring af revisionsforhold",
].map(x => ({ value: x, label: x }));

const CompanyTimeline = (props: Props) => {
  const classes = useStyles();
  const { companyData, timeline } = props;

  const { t } = useTranslation();

  const [selectedDateStart, setSelectedDateStart] = React.useState<Date | null>(
    null
  );

  const handleDateChangeStart = (date: Date | null) => {
    setSelectedDateStart(date);
  };

  const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date | null>(
    null
  );

  const handleDateChangeEnd = (date: Date | null) => {
    setSelectedDateEnd(date);
  };

  const [filterHeader, setFilterHeader] = useState<SelectOptions | null>(
    null
  );

  const handleFilterHeader = (header: SelectOptions | null) => {
    setFilterHeader(header);
  };

  const filterTimeline = (timelineItem) => {
    let filterCheck = true;
    let startDateCheck = true;
    let endDateCheck = true;

    if (filterHeader) {
      filterCheck = timelineItem.header === filterHeader.value;
    }

    if (selectedDateStart) {
      startDateCheck = moment(timelineItem.date).isAfter(selectedDateStart);
    }

    if (selectedDateEnd) {
      endDateCheck = moment(timelineItem.date).isBefore(selectedDateEnd);
    }

    return filterCheck && startDateCheck && endDateCheck;
  };

  // replace text inside string string with link


  const getTextBetween = (text: string, start: string, end: string) => {
    const regex = new RegExp(`${start}(.*?)${end}`, "g");
    const matches = text.match(regex);
    if (matches) {
      return matches[0].replace(`${start}`, "").replace(`${end}`, "");
    }
    return "";
  };

  // eslint-disable-next-line consistent-return
  const transformHtml = (node, index) => {
    if (node.name === "h1") {
      return <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>{node?.children?.find(x => x.type === "text")?.data}</Typography>;
    }

    if (node.name === "h2") {
      return <Typography style={{ fontSize: "1rem", fontWeight: "bold", fontStyle: "italic" }}>{node?.children?.find(x => x.type === "text")?.data}</Typography>;
    }

    if (node.type === "text") {
      return <Typography style={{ fontSize: "0.875rem" }}>{node.data}</Typography>;
    }


    if (node.name === "p") {
      const text = node?.children?.find(x => x.type === "text")?.data;
      const startText = text.split("@pers").shift();
      const endText = text.split("}").pop();
      const personText = getTextBetween(text, "@pers{", "}");
      if (personText.length > 0) {
        return (
          <div>
            <Typography display="inline" style={{ fontSize: "0.875rem" }}>{startText}</Typography>
            <Typography display="inline" style={{ fontSize: "0.875rem" }}><Link target="_blank" display="inline" underline="hover" href={`https://datacvr.virk.dk/enhed/person/${personText.split(",").pop()?.replace(" ", '')}/deltager`}>{personText.split(",").shift()?.replace(/"/g, '')}</Link></Typography>
            <Typography display="inline" style={{ fontSize: "0.875rem" }}>{endText}</Typography>
          </div>
        );
      }
      return <Typography style={{ fontSize: "0.875rem" }}>{text}</Typography>;
    }

    if (node.name === "html") {
      // eslint-disable-next-line no-param-reassign
      node.name = 'div';
      return convertNodeToElement(node, index, transformHtml);
    }

    if (node.name === "br") {
      return null;
    }
  };

  const actualTimeline = timeline || companyData?.Tidslinje;


  return (
    <div>
      <Typography variant="h6" className={classes.filterHeader}>
        {t("company.timeline.filter")}
      </Typography>
      <Grid container className={classes.topContainer}>
        <Grid item xs={6} className={classes.gridItem}>
          <Select
            styles={{
              ...selectStyles(),
              container: provided => ({
                ...provided,
                marginTop: 16
              }),
              control: provided => ({
                ...provided,
                height: 44.625
              })
            }}
            options={headerOptions}
            isClearable
            value={filterHeader}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            placeholder={t("company.timeline.headers_option_label")}
            menuPosition="absolute"
            onChange={handleFilterHeader}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItem} style={{ display: 'flex' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label={t("company.timeline.start_date")}
              value={selectedDateStart}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}

              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label={t("company.timeline.end_date")}
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

      </Grid>

      <Timeline>
        <TransitionGroup>

          {actualTimeline?.filter(filterTimeline).map((item) => (
            <Collapse key={`${item.header}${item.date}`}>

              <TimelineItem>
                <TimelineOppositeContent>{moment(item.date).format("DD/MM/YYYY")}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    {item.header}
                  </Typography>
                  <Paper elevation={3} className={classes.paper}>
                    <div>
                      {ReactHtmlParser(item.body, {
                        transform: transformHtml
                      })}
                    </div>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </Timeline>


    </div>
  );
};

export default CompanyTimeline;
