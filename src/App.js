
import React from "react";
import './App.css';
import Navbar from './components/Navbar/NavBar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home/home';
import Profile from './pages/Profile/profile';
import Footer from './components/Footer';
import MyItems from './pages/MyItems/myItems';
import AllItems from './pages/AllItems/AllItems'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthProvider } from "./context.js";
import LogIn from "./pages/Login/login";
import InstantSearch from "./pages/Seach/search";
import AboutUs from "./pages/AboutUs/AboutUs";



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000'
      },
    }
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div id="navMenu">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/my-items' element={<MyItems />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/all-items' element={<AllItems />} />
              <Route path='/search' element={<InstantSearch />} />
              <Route path='/about-us' element={<AboutUs />} />
            </Routes>
          </div>
          <div id="footer">
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>





  );
}


export default App; 
