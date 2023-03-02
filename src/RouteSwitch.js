import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

const RouteSwitch = () => {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default RouteSwitch;