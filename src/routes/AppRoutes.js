import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../layout/Header/Header';
import Home from './Home/Home';
import Shop from './Shop/Shop';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
