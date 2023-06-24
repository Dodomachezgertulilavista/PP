import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import ButFile from '../Display elements/ButFile';
import '../../styles/appbar.css';
import {State} from "../state"; // Import CSS file for custom styles

export default function App({egg, setEgg, state, setLoading}) {
    return (
        <div>
            <AppBar position="static" className="animated-appbar">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Typography
                        onClick={() => {
                            if (state === State.HAVE_DATA) setEgg(!egg)
                        }
                        }
                        variant="h6"
                        className={(egg ? "animated-gradient " : "") + "animated-text"}
                    >
                        Поиск злоумышленников
                    </Typography>
                    <ButFile state={state} setter={setLoading}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
