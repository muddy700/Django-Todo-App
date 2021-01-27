import React from 'react'
import { Typography, Card, Layout, Menu, Row, Col, List, message, Badge, Form, Input, Button  } from 'antd';

const { Title} = Typography

export const ProfilePage = (props) => {

  const { currentUser, } = props

    return (
        <div>
            <Title >Profile Page</Title>
            <Title level={4}>The Following Are Your Credentials</Title>
            <Title level={5}>Username :  {currentUser.username} </Title>
            <Title level={5}>Email : {currentUser.email} </Title>
            <Title level={5}>Password : {currentUser.password} </Title>

        </div>
    )
}
