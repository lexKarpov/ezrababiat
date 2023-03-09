import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import EditProfile from "../EditProfile/EditProfile";
import {authorize, createUser, testToken, verifyToken} from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false)
  const cards = [
    {
      _id: '123',
    },
    {
      _id: '124',
    },
    {
      _id: '125',
    },
    {
      _id: '126',
    },
    {
      _id: '127',
    },
    {
      _id: '128',
    }
  ]

  useEffect(_=> {
    const jwt = localStorage.getItem('jwt')
    // console.log(jwt)
    // verifyToken(jwt)
    // testToken(jwt)

  })

  function changePageLogin(val) {
    setIsLogged(val)
  }
  function logOut() {
    localStorage.clear()
    setIsLogged(false)
    navigate("/")
  }

  function logIn(res, name) {
    const {password, email} = res
    return authorize({password, email})
      .then(result => {
        localStorage.setItem('jwt', result.user.accessToken)
        navigate('/')
        setIsLogged(true)
        console.log(result.uid)
        setCurrentUser({email: result.user.email , name: result.userData.name})
      })
      .catch(err => {
        console.log(err)
      })

  }

  function submitRegisterForm(data, nameForm) {
    nameForm === 'signup' ?
      createUser(data)
        .then(res => {
          console.log(res)
          console.log('success')
          logIn(res)
      })
      :
      logIn(data).then(res => {
        console.log('success')
      })
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
            <Route path="/" element={
              <ProtectedRoute isLogged={isLogged}>
                <Main cards={cards}/>
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
          <Footer/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
