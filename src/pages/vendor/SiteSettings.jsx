import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import GeneralMenu from "./menus/Menu";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs() {
  const [outerTab, setOuterTab] = React.useState(0);
  const [innerTab, setInnerTab] = React.useState(0);

  const handleOuterChange = (event, newValue) => {
    setOuterTab(newValue);
  };

  const handleInnerChange = (event, newValue) => {
    setInnerTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        py: 3,
        overflowY: "auto",
      }}
      className="pages-admin-target-style"
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              bgcolor: "#0f172a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.16)",
            }}
          >
            <TuneRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Site Settings
            </Typography>
            <Typography sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Configure general store preferences and navigation menu structures
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            p: 3,
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
          }}
        >
          {/* Outer Tabs */}
          <Tabs
            value={outerTab}
            onChange={handleOuterChange}
            aria-label="outer tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: "1px solid #e2e8f0",
              minHeight: 42,
              "& .MuiTab-root": {
                minHeight: 42,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                color: "#64748b",
                "&.Mui-selected": { color: "#0f172a" },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#0f172a",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Menu" {...a11yProps(1)} />
          </Tabs>

          {/* Outer Tab Panels */}
          <TabPanel value={outerTab} index={0}>
            <Box
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#f8fafc",
                border: "1px dashed #cbd5e1",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>
                This is the General tab content.
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={outerTab} index={1}>
            {/* Inner Tabs */}
            <Tabs
              value={innerTab}
              onChange={handleInnerChange}
              aria-label="inner menu tabs"
              sx={{
                borderBottom: "1px solid #e2e8f0",
                minHeight: 38,
                "& .MuiTab-root": {
                  minHeight: 38,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#64748b",
                  "&.Mui-selected": { color: "#10b981" },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#10b981",
                  height: 2.5,
                },
              }}
            >
              <Tab label="General Menu" />
              <Tab label="Sale Menu" />
            </Tabs>

            {/* Inner Tab Panels */}
            <TabPanel value={innerTab} index={0}>
              <GeneralMenu keyMenu={"general-menu"} />
            </TabPanel>
            <TabPanel value={innerTab} index={1}>
              <GeneralMenu keyMenu={"sale-menu"} />
            </TabPanel>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
