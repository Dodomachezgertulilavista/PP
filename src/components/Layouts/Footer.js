import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Elements from '../Display elements/Elements';
import { invoke } from '@tauri-apps/api';

function TabPanel({ children, index, value, ...other }) {
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <animated.div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={fadeIn}
            {...other}
        >
            <Box sx={{ p: 0.5 }}>{children}</Box>
        </animated.div>
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

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const [listData, setListData] = useState({
        list_of_ip: {},
        list_of_usr: {},
        list_of_work: {},
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const [ipData, usrData, usrWorks] = await Promise.all([
                invoke('get_ip'),
                invoke('get_usr_ip'),
                invoke('get_works'),
            ]);

            setListData({
                ...listData,
                list_of_ip: ipData,
                list_of_usr: usrData,
                list_of_work: usrWorks,
            });
        };

        fetchData().catch(() => {
            console.error('Error fetching data');
        });
    }, []);

    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <animated.div style={fadeIn}>
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        textColor="secondary"
                        variant="fullWidth"
                        indicatorColor="secondary"
                    >
                        {['Список по IP', 'Список по тестам', 'Список человек-IP'].map((group, index) => (
                            <Tab key={index} label={group} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                <TabPanel index={0} value={value}>
                    <Elements input_object={listData.list_of_ip} hasFlag={false} />
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <Elements input_object={listData.list_of_work} hasFlag={true} />
                </TabPanel>
                <TabPanel index={2} value={value}>
                    <Elements input_object={listData.list_of_usr} hasFlag={false} />
                </TabPanel>
            </Box>
        </animated.div>
    );
}
