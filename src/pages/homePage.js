import '../App.css';
import { Typography, Card, Layout, Menu, Row, Col, List, message, Badge, Form, Input, Button  } from 'antd';
import React , { useState, useEffect } from 'react'
import { TodosPage } from "./todosPage";
import {  ProfilePage } from "./profilePage";
import {  AboutPage } from "./aboutPage";

const { Title} = Typography
const { Header, Content, Footer } = Layout;

export const HomePage = (props) => {
  const { currentUser, userTodos, setActivePage } = props
  const [activeTab, setActiveTab] = useState(1)
  
  const todos = <TodosPage currentUser={currentUser} userTodos={userTodos}/>
  const about = <AboutPage />
  const profile = <ProfilePage currentUser={currentUser}/>

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
              <Menu.Item key="2" onClick={changeContent}>About</Menu.Item>
              <Menu.Item key="3" onClick={changeContent}>Profile</Menu.Item>
              <Menu.Item key="4"><Title level={4} style={{color: 'white'}}> Welcome {currentUser.username}.</Title></Menu.Item>
              <Menu.Item key="5" style={{float: 'right'}} onClick={() => setActivePage(1)}>Logout</Menu.Item>
            </Menu>
          </Header>
          <Content className="content-tag" >
          {tabs[activeTab]}
          </Content>
          <Footer className="footer-tag " > <i>Created By Brungas &copy;2021.</i> </Footer>
        </Layout>
    )
}