import React, {useState} from 'react'
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import './App.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import EditProfile from "../EditProfile/EditProfile";
import {
  addFriend,
  authorize,
  createUser,
  deleteCard,
  getAllUsers,
  updateProfile,
  updateTask,
  writeGoodTask
} from "../../utils/api";
import SearchFriend from "../SearchFriend/SearchFriend";
import AddTask from "../AddTask/AddTask";
import EditTask from "../EditTask/EditTask";
import Friends from "../Friends/Friends";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false)

  function changePageLogin(val) {
    setIsLogged(val)
  }

  function logOut() {
    setIsLogged(false)
    setCurrentUser({})
    navigate("/signup")
  }

  function writeTask({title}) {
    writeGoodTask(title, currentUser.uid, currentUser.tasks).then(taskList => {
      setCurrentUser({
        ...currentUser,
        tasks: taskList
      })
      navigate("/")
    })
  }

  function editCard({title}, cardId) {
    const newList = currentUser.tasks.map((el, index) => index === cardId ? el = title : el)
    updateTask(newList, currentUser.uid)
      .then(_ => {
        setCurrentUser({
          ...currentUser,
          tasks: newList
        })
        navigate("/")
      })
  }

  function updateUser(data) {
    return updateProfile(currentUser.uid, data.name, data.email)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email
        })
        navigate("/")
      })
  }

  function logIn(res) {
    const {password, email, uid} = res
    return authorize({password, email})
      .then(result => {
        navigate('/')
        setIsLogged(true)
        setCurrentUser({email: result.user.email, name: result.userData.name, uid, tasks: result.userData.tasks, friends: result.userData.friends})
      })
      .catch(err => {
        alert('неверные данные')
        navigate('/signin')
      })
  }

  function onCardDelete(cardId) {
    const newList = currentUser.tasks.filter((el, index) => index !== cardId)
    deleteCard(newList, currentUser.uid)
      .then(_=> {
        setCurrentUser({
          ...currentUser,
          tasks: newList
        })
      })
  }

  function addUser({name, tasks}) {
    console.log('tasks')
    console.log(tasks)
    addFriend(name, tasks, currentUser.uid)
      .then(res =>
      {
        setCurrentUser({
          ...currentUser,
          friends: [...currentUser.friends, {name, tasks}]
        })
        navigate("/")
      }
  )
  }

  function submitRegisterForm(data, nameForm) {
    nameForm === 'signup' ?
      createUser(data)
        .then(res => {
          logIn(res)
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      :
      logIn(data)
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
              }/>
            <Route path="/" element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  cards={currentUser.tasks}
                  onCardDelete={onCardDelete}
                  editCard={editCard}
                  navigate={navigate}
                />
              </ProtectedRoute>
            }
            />

            <Route path="/editProfile" element={
              <ProtectedRoute isLogged={isLogged}>
                <EditProfile
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  logOut={logOut}
                  updateUser={updateUser}
                />
              </ProtectedRoute>
            }/>

            <Route path="/search" element={
              <ProtectedRoute isLogged={isLogged}>
                <SearchFriend
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  addUser={addUser}
                />
              </ProtectedRoute>
            }/>

            <Route path="/addTask" element={
              <ProtectedRoute isLogged={isLogged}>
                <AddTask
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  logOut={logOut}
                  writeTask={writeTask}
                />
              </ProtectedRoute>
            }/>

            <Route path="/editTask/:id" element={
              <ProtectedRoute isLogged={isLogged}>
                <EditTask
                  isLogged={isLogged}
                  pageLogin={changePageLogin}
                  editCard={editCard}
                />
              </ProtectedRoute>
            }/>

            <Route path="/friends" element={
              <ProtectedRoute isLogged={isLogged}>
                <Friends
                  cards={currentUser.friends}
                  onCardDelete={onCardDelete}
                  editCard={editCard}
                  navigate={navigate}
                />
              </ProtectedRoute>
            }/>
          </Routes>
          <Footer/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
