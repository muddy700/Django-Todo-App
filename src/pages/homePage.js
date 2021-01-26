import '../App.css';
import { Typography, Card } from 'antd';
import React , { useState, useEffect } from 'react'

const { Title} = Typography

export const HomePage = (props) => {
    const { currentUser, userTodos } = props

    // if(userTodos){
        var todoList =  userTodos.map((todo)=> <Title level={6} key={todo.id}>todo.title</Title>)
    // }
    return (
        <div>
            <Title level={2}> Welcome {currentUser.username}!.</Title>

            <Title level={4}>Your Todos Are Listed Bellow.</Title>
            {todoList}
            
        </div>
    )
}

