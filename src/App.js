import React , { useState, useEffect } from 'react'
import { LoginPage} from './pages/loginPage'
import { HomePage} from './pages/homePage'
import { RegistrationPage } from './pages/registrationPage'
// import {  TodosPage} from "./pages/todosPage";
import { message } from 'antd';
import './App.css';
import { fetchUserTodos} from './api'

  const App = () => {

    const user = {
      id : 0,
      username: 'Reactor',
      password: '',
      email: ''
    }

    const [currentUser, setCurrentUser] = useState(user)
    const [activePage, setActivePage] = useState(1)
    const [userTodos, setUserTodos] = useState([])

    const pullTodos = async () => {
        try {
            const todos = await fetchUserTodos(currentUser.id)
            setUserTodos(todos)
        } catch (err) {
            if (err && err.response.data) {
                // error from the server
                message.error('Server Error')
            } else if (err.request) {
                // netwoerk errors
                message.error('Network Error')
            } else {
                // Any other errors
                message.error('Other Error')
            }
            // console.log('hyo => ' + err)
            // message.error('No Internet Connection')
        }
    }

    useEffect(() => {

        pullTodos()
        
    }, [currentUser.id])

    const login_Page = <LoginPage setCurrentUser={setCurrentUser} setActivePage={setActivePage} />
    const home_Page = <HomePage currentUser={currentUser} userTodos={userTodos} setActivePage={setActivePage} />
    const registration_Page = <RegistrationPage  setActivePage={setActivePage}/>

    const components = {
      1: login_Page,
      2: home_Page,
      3: registration_Page
    }

  return (
    <div className="App">
      { components[activePage] }
    </div>
  )
}

export default App;