import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import ButFile from '../Display elements/ButFile';
import '../../styles/appbar.css'; // Import CSS file for custom styles

export default function App({egg, setEgg, state, setLoading}) {
    return (<div>
        <AppBar position="static">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography onClick={() => setEgg(!egg)} variant="h6" className="animated-gradient">
                    Поиск злоумышленников
                </Typography>
                <ButFile state={state} setter={setLoading}/>
            </Toolbar>
        </AppBar>
    </div>);
}
