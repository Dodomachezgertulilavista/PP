import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import {List_of_IP, List_of_Users, List_of_Users_Tests} from "../store";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return <
    div>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header/>
      <Footer list_of_ip={List_of_IP} list_of_users={List_of_Users} list_of_test={List_of_Users_Tests}/>
    </ThemeProvider>
  </div>
}

export default App;

