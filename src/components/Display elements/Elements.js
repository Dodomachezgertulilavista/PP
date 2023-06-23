import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItem from "@mui/material/ListItem";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function NestedList({ list, showIcon }) {
    const [openStates, setOpenStates] = React.useState(Array(list.length).fill(false));

    const handleClick = (index) => {
        setOpenStates((prevOpenStates) => {
            const updatedStates = [...prevOpenStates];
            updatedStates[index] = !prevOpenStates[index];
            return updatedStates;
        });
    };

    return (
        <List
            sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 700
            }}
            component="nav"
            subheader={<ListSubheader component="div" id="nested-list-subheader" />}
        >
            {list.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItemButton onClick={() => handleClick(index)}>
                            {!showIcon ? null : (
                                <ListItemIcon>
                                    {item.lists.length > 2 ? (
                                        <ErrorOutlineIcon color="error"/>
                                    ) : item.lists.length === 2 ? (
                                        <WarningAmberIcon color="warning"/>
                                    ) : (
                                        <CheckCircleOutlineIcon color="success"/>
                                    )}
                                </ListItemIcon>
                            )
                            }
                        <ListItemText primary={item.name} />
                        {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <li>
                                <ul>
                                    {item.lists.map((name, idx) => (
                                        <ListItem key={idx}>
                                            <ListItemText primary={name} />
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
}
