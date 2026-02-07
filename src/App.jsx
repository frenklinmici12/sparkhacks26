import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

//import all pages here!
import MainPage from './pages/MainPage/MainPage.jsx';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import HashtagPage from "./pages/HashtagPage/HashtagPage.jsx";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
        <Route path="/hashtag/:hashtagName" element={<HashtagPage/>}></Route>
      </Routes>
    </Router>
  );
}
``
