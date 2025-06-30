import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Container, Divider } from '@mui/material';
import GeneralMenu from './menus/Menu';

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
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs() {
  const [outerTab, setOuterTab] = React.useState(0);
  const [innerTab, setInnerTab] = React.useState(0); // for menu's nested tabs

  const handleOuterChange = (event, newValue) => {
    setOuterTab(newValue);
  };

  const handleInnerChange = (event, newValue) => {
    setInnerTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', py: 3, overflowY: 'auto' }}>
      <Container sx={{ maxWidth: '100% !important' }}>
        <Box sx={{ width: '100%', backgroundColor: 'white', p: 2, borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
          
          {/* Outer Tabs */}
          <Tabs
            value={outerTab}
            onChange={handleOuterChange}
            aria-label="outer tabs"
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Menu" {...a11yProps(1)} />
          </Tabs>
          <Divider />

          {/* Outer Tab Panels */}
          <TabPanel value={outerTab} index={0}>
            <Typography>This is the General tab content.</Typography>
          </TabPanel>

          <TabPanel value={outerTab} index={1}>
            {/* Inner Tabs */}
            <Tabs
              value={innerTab}
              onChange={handleInnerChange}
              aria-label="inner menu tabs"
              textColor="secondary"
              indicatorColor="secondary"
              sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}
            >
              <Tab label="General Menu" />
              <Tab label="Sale Menu" />
            </Tabs>

            {/* Inner Tab Panels */}
            <TabPanel value={innerTab} index={0}>
              <GeneralMenu keyMenu={'general-menu'}/>
            </TabPanel>
            <TabPanel value={innerTab} index={1}>
              <GeneralMenu keyMenu={'sale-menu'}/>
            </TabPanel>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
