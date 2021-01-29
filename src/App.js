import React , { useState, useEffect } from 'react'
import { LoginPage} from './pages/loginPage'
import { HomePage} from './pages/homePage'
// import {  TodosPage} from "./pages/todosPage";
import { message } from 'antd';
import './App.css';
import { fetchAllTodos} from './api'

  const App = () => {

    const user = {
      id : 0,
      username: 'Reactor',
      password: '',
      email: ''
    }

    const [currentUser, setCurrentUser] = useState(user)
    const [activePage, setActivePage] = useState(1)
    const [todos, setTodos] = useState([])
    const [userTodos, setUserTodos] = useState([])

    const pullTodos = async () => {
        try {
            const todos = await fetchAllTodos()
            setTodos(todos)
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
        
        filterUserTodos()

    }, [currentUser.id])

    const filterUserTodos = () => {
      const userTasks = todos.filter((todo) => todo.owner_id === currentUser.id)
      setUserTodos(userTasks)
    }

    const login_Page = <LoginPage setCurrentUser={setCurrentUser} setActivePage={setActivePage} />
    const home_Page = <HomePage currentUser={currentUser} userTodos={userTodos} setActivePage={setActivePage} />

    const components = {
      1: login_Page,
      2: home_Page,
    }

  return (
    <div className="App">
      { components[activePage] }
    </div>
  )
}

export default App;