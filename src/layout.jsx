import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);

