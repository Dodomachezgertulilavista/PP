import React, {useEffect, useState} from 'react';
import {
    Box,
    Collapse,
    createTheme,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    TextField,
    ThemeProvider,
    Typography,
} from '@mui/material';
import {ErrorOutline, ExpandLess, ExpandMore, WarningAmber,} from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

// Add custom CSS styles for the scroll bar
const styles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }
`;

export default function NestedList({input_object, hasFlag}) {
    const [openStates, setOpenStates] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [filteredKeys, setFilteredKeys] = useState([]);
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'error', 'warning'

    const handleClick = (id) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [id]: !prevOpenStates[id],
        }));
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const filteredKeys = Object.keys(input_object).filter((key) =>
                key.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredKeys(filteredKeys);
        }, 300);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchKey, input_object]);

    useEffect(() => {
        setOpenStates({});
    }, [filteredKeys]);

    const getIcon = (key) => {
        if (!hasFlag) {
            const listLength = input_object[key].length;
            if (listLength > 2) {
                return <ErrorOutline color="error"/>;
            } else if (listLength === 2) {
                return <WarningAmber color="warning"/>;
            } else {
                return <CheckCircleOutlineIcon color="success"/>;
            }
        }

        let max_value = 0;
        for (const test in input_object[key]) {
            max_value = Math.max(max_value, input_object[key][test]);
        }

        if (max_value === 2) {
            return <ErrorOutline color="error"/>;
        } else if (max_value === 1) {
            return <WarningAmber color="warning"/>;
        } else {
            return <CheckCircleOutlineIcon color="success"/>;
        }
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filterItems = (items) => {
        if (filterOption === 'all') {
            return items;
        } else if (filterOption === 'error') {
            return items.filter((item) => {
                if (hasFlag) {
                    return Object.values(input_object[item]).some((value) => value === 2);
                } else {
                    return input_object[item].length > 2;
                }
            });
        } else if (filterOption === 'warning') {
            return items.filter((item) => {
                if (hasFlag) {
                    return Object.values(input_object[item]).every((value) => value === 1);
                } else {
                    return input_object[item].length === 2;
                }
            });
        } else {
            return items;
        }
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Box display="flex" flexDirection="column" height="100vh">
                <style>{styles}</style>
                <Box sx={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TextField
                        sx={{width: '50%', marginRight: '10px'}}
                        label="Поиск"
                        color="secondary"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <TextField
                        select
                        sx={{width: '50%'}}
                        label="Фильтр"
                        color="secondary"
                        value={filterOption}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">Все</MenuItem>
                        <MenuItem value="warning">Подозреваемые</MenuItem>
                        <MenuItem value="error">Злоумышленники</MenuItem>
                    </TextField>
                </Box>

                <List
                    sx={{
                        width: '100%',
                        flex: 1,
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 'calc(100vh - 200px)',
                    }}
                    component="nav"
                    subheader={<ListSubheader component="div" id="nested-list-subheader"/>}
                >
                    {filteredKeys.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
                            Результатов не найдено
                        </Typography>
                    ) : (
                        filterItems(filteredKeys).map((key) => (
                            <React.Fragment key={key}>
                                <ListItemButton onClick={() => handleClick(key)}>
                                    <ListItemIcon>{getIcon(key)}</ListItemIcon>
                                    <ListItemText primary={key}/>
                                    {openStates[key] ? <ExpandLess/> : <ExpandMore/>}
                                </ListItemButton>
                                <Collapse in={openStates[key]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ul>
                                            {hasFlag ? (
                                                Object.keys(input_object[key]).map((test, idx) => (
                                                    <ListItem key={`${key}-${idx}`}>
                                                        <ListItemIcon>
                                                            {input_object[key][test] === 2 ? (
                                                                <ErrorOutline color="error"/>
                                                            ) : (
                                                                <WarningAmber color="warning"/>
                                                            )}
                                                        </ListItemIcon>
                                                        <ListItemText primary={test}/>
                                                    </ListItem>
                                                ))
                                            ) : (
                                                input_object[key].map((item, idx) => (
                                                    <ListItem key={`${key}-${idx}`}>
                                                        <ListItemText primary={item}/>
                                                    </ListItem>
                                                ))
                                            )}
                                        </ul>
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Box>
        </ThemeProvider>
    );
}
