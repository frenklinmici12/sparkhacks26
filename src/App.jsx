import { useState } from "react";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import MainPage from './pages/MainPage/MainPage.jsx';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}
``
