import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

const RouteSwitch = () => {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default RouteSwitch;