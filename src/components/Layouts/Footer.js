import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Elements from "../Display elements/Elements";

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
                <Box sx={{ p: 0.5 }}>
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

export default function BasicTabs({list_of_ip, list_of_test, list_of_users}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                      onChange={handleChange}
                      centered
                      textColor="secondary"
                      variant="fullWidth"
                      indicatorColor="secondary"
                >
                    {['Список по IP', 'Список по тестам','Список человек-IP'].map((group, index) => (
                        <Tab key={index} label={group} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            <TabPanel index={0} value={value}>
                <Elements list={list_of_ip} showIcon={true}/>
            </TabPanel>
            <TabPanel index={1} value={value}>
                <Elements list={list_of_test} showIcon={false}/>
            </TabPanel>
            <TabPanel index={2} value={value}>
                <Elements list={list_of_users} showIcon={true}/>
            </TabPanel>
        </Box>
    );
}