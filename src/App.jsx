import React, { useContext } from "react";
import Header from "./components/Header";
import AuthPage from "./components/AuthPage";
import AdminPanel from "./components/AdminPanel";

import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";

const App = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    // <div><AuthPage></AuthPage></div>
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isAdmin ? (
              <AdminPanel></AdminPanel>
            ) : (
              <AuthPage></AuthPage>
            )
          }
        ></Route>
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPanel></AdminPanel> : <AuthPage></AuthPage>}></Route>
      </Routes>
    </>
  );
};

export default App;
