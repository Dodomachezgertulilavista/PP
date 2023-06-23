import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import ButFile from '../Display elements/ButFile'


export default function () {
    return (
        <div>
            <AppBar position="static" /*sx={{height: 200}}*/>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Typography variant="h6">
                        Поиск злоумышленников
                    </Typography>
                    <ButFile/>
                </Toolbar>
            </AppBar>
        </div>
    )
}