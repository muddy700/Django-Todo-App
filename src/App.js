import React , { useState, useEffect } from 'react'
import { LoginPage} from './pages/loginPage'
import { HomePage} from './pages/homePage'
import { fetchAllUsers} from './api'
import { message } from 'antd';
import './App.css';

  const App = () => {

    const [users, setUsers] = useState([])
    const [activePage, setActivePage] = useState(1)

    const pullUsers = async () => {
        try {
            const users = await fetchAllUsers()
            setUsers(users)
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

      pullUsers()

    } , [])

    const login_Page = <LoginPage />
    const home_Page = <HomePage />

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

        // <Title level={1}>Hey!, Brunga!.</Title>
        // <Title level={3}>Your Todos Are Listed Below</Title>
        // {users.map((user) => {
        //   return <Title level={5}>{user.username}</Title> } )} 