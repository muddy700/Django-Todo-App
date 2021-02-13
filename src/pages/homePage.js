import '../App.css';
import { Typography, Layout, Menu, message } from 'antd';
import React , { useState, useEffect } from 'react'
import { TodosPage } from "./todosPage";
import {  ProfilePage } from "./profilePage";
import {  AboutPage } from "./aboutPage";
import { 
  // fetchUserTodos,
   getUserProfile} from '../api'


const { Title} = Typography
const { Header, Content, Footer } = Layout;

export const HomePage = (props) => {
  const { currentUser, setActivePage, userTodos2} = props
  const [activeTab, setActiveTab] = useState(1)
  // const [userTodos, setUserTodos] = useState([])
  const [userProfile, setUserProfile] = useState({})
  // var todosList

  // const pullTodos = async () => {
  //       try {
  //          const todosList = await fetchUserTodos(currentUser.id)
  //           setUserTodos(todosList)
  //           // console.log(todosList)
  //           // console.log(userTodos)   
  //       } catch (err) {
  //           if (err && err.response.data) {
  //               // error from the server
  //               message.error('Server Error')
  //           } else if (err.request) {
  //               // netwoerk errors
  //               message.error('Network Error')
  //           } else {
  //               // Any other errors
  //               message.error('Other Error')
  //           }
  //           // console.log('hyo => ' + err)
  //           // message.error('No Internet Connection')
  //       }
  //   }

  const getProfile = async () => {
        try {
           const profile = await getUserProfile(currentUser.id)
            setUserProfile(profile.data)
            // console.log(profile.data)
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

        // pullTodos()
        getProfile()
        
    // }, [])
    }, [currentUser.id])


  
  
  const todos = <TodosPage currentUser={currentUser} userTodos={userTodos2}/>
  const about = <AboutPage />
  const profile = <ProfilePage currentUser={currentUser} userProfile={userProfile} />

    const changeContent = (menu) => {
      setActiveTab(menu.key)
    }

    const tabs = {
      1: todos,
      2: about,
      3: profile
    }

    return (
        <Layout>
          <Header className="header-tag" >
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu-tag">
              <Menu.Item key="1" onClick={changeContent}>Home</Menu.Item>
              <Menu.Item key="4"><Title level={4} style={{color: 'white'}}>{currentUser.username}.</Title></Menu.Item>
              <Menu.Item key="2" onClick={changeContent}>About</Menu.Item>
              <Menu.Item key="3" onClick={changeContent}>Profile</Menu.Item>
              <Menu.Item key="5" style={{float: 'right'}} onClick={() => setActivePage(1)}>Logout</Menu.Item>
            </Menu>
          </Header>
          <Content className="content-tag" >
            {/* <Title>mo</Title> */}
            {tabs[activeTab]}
          </Content>
          <Footer className="footer-tag " > <i>Created By Brungas &copy;2021.</i> </Footer>
        </Layout>
    )
}