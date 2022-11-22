import React from 'react';
import {Routes, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import UpdateMyBlog from "../pages/UpdateMyBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Navbar from '../components/Navbar';
import { useEffect } from "react";
import { useObserverHook } from "../helpers/firebase";



const AppRouter = () => {

const { userObserver } = useObserverHook();

  useEffect(() => {
    userObserver();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/details" element={<PrivateRouter />}>
          <Route path="" element={<Details />} />
          <Route path=":id" element={<UpdateMyBlog />} />
        </Route>

        <Route path="/newblog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>

        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter