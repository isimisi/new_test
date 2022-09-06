import Box from "@material-ui/core/Box";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      {value === index && (
        /* @ts-ignore - No implicit children can be removed when material ui is upgraded */
        <Box style={{ width: "100%", height: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  children: null
};

export default TabPanel;
