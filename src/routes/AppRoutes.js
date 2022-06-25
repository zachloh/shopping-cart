import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Shop from './Shop/Shop';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
