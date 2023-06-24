import React, {useState} from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import {State} from "./components/state";
import {LinearProgress, Typography} from "@mui/material";
import './styles/app.css';
import './styles/animations.css'; // Add this line to import the CSS file with animations

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function getState(state) {
    switch (state) {
        case State.NO_DATA:
            return (
                <Typography
                    variant="h5"
                    sx={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    className="fade-in" // Add the CSS class for the animation
                >
                    Загрузите файл, чтобы начать
                </Typography>
            );
        case State.LOADING:
            return <LinearProgress color="secondary" sx={{height: 10}}/>;
        case State.HAVE_DATA:
            return <Footer/>;
        default:
            return null;
    }
}

function App() {
    const [state, setState] = useState(State.NO_DATA);
    const [egg, setEgg] = useState(false);
    return (
        <div className="app-container">
            <div className={state === State.HAVE_DATA && egg ? "egg" : ""}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <Header egg={egg} setEgg={setEgg} state={state} setLoading={setState}/>
                    {getState(state)}
                </ThemeProvider>
            </div>
        </div>);
}

export default App;
