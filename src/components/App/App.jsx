import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import EditProfile from "../EditProfile/EditProfile";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false)
  const cards = [
    {
      _id: '123',
    },
    {
      _id: '123',
    },
    {
      _id: '123',
    },
    {
      _id: '123',
    },
    {
      _id: '123',
    },
    {
      _id: '123',
    }
  ]

  function changePageLogin(val) {
    setIsLogged(val)
  }
  function logOut() {
    localStorage.clear()
    setIsLogged(false)
    navigate("/")
  }

  function submitRegisterForm(data, nameForm) {
    console.log('I work!!!!!!!!!')
    // nameForm === 'signup' ?
    //   register(data)
    //     .then(res => logIn(data))
    //     .catch(err => {
    //       console.log(err)
    //       setIsSelectedImageTooltip(false)
    //       setIsSelectedInfoTooltip(false)
    //     }).finally(() => setPreloader(false))
    //   : logIn(data)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="content">

          <Routes>
            <Route
              path="/signup"
              element={
                <Register
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  submitRegisterForm={submitRegisterForm}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  submitRegisterForm={submitRegisterForm}
                />
              } />
            <Route path="/saveFilms" element={
              <ProtectedRoute isLogged={isLogged}>
                <Main/>
              </ProtectedRoute>
            }
            />

            <Route path="/editProfile" element={
              <ProtectedRoute isLogged={isLogged}>
                <EditProfile
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  logOut={logOut}
                  // updateUser={updateUser}
                />
              </ProtectedRoute>
            } />
          </Routes>
          <Header/>
          <Main cards={cards}/>
          <Footer/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
