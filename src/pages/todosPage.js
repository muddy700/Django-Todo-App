
import { DeleteFilled, EditFilled } from '@ant-design/icons';import '../App.css';
import { Typography, Card, Layout, Menu, Row, Col, List, message, Badge, Form, Input, Button  } from 'antd';
import React , { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';

export const TodosPage = (props) => {
    const { currentUser, userTodos } = props

    const initialTodo = {
        id: '',
        title: '',
        description: '',
        owner_id: '',
    }

    const [viewMode, setViewMode] = useState('all')
    const [totalTodos, setTotalTodos] = useState(0)
    const [activeTodo, setActiveTodo] = useState(initialTodo)
    
    var headerMessage = 'Total Tasks'
    var arrayOfTodos
    if(viewMode === 'all'){
      arrayOfTodos = userTodos
    }
    else if(viewMode === 'completed'){
      arrayOfTodos = userTodos.filter((todo) => todo.status === "True")
      headerMessage = 'Completed Tasks'
    }
    else if(viewMode === 'pending'){
      arrayOfTodos = userTodos.filter((todo) => todo.status === "False")
      headerMessage = 'Pending Tasks'
    }


    const countTodos = () => {
      setTotalTodos(arrayOfTodos.length)
    }

    const deleteSingleTodo = (id) => {
        message.success('Id To Delete Is '+ id)
        arrayOfTodos = arrayOfTodos.filter((todo) => todo.id !== id)
    }
    
    const editTodo = (id) => {
        message.success('Id To Edit Is '+ id)

    }

     useEffect(() => {
       countTodos()
    }, [viewMode, arrayOfTodos])

      // const todoList =  userTodos.map((todo)=> <Title level={6} key={todo.id}>{todo.title}</Title>)

       const onFinish = (values) => {
     
    };
    return (
       <Card className="outer-card">
              
              <Row>
                <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 6, span: 12}}>
                  <Card className="inner-card" title = "Add, Edit Or Delete Todo">
                      <Card className="form-card">
                        <Form
                          name="normal_login"
                          className="todo-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          >
                          <Row>
                            <Col xs={8} sm={4} md={4} lg={4} xl={6}>
                              <Form.Item
                                  name="title"
                                  rules={[{ required: true, message: 'Please input Title!' }]} >
                                  <Input placeholder="Title" />
                              </Form.Item>
                            </Col>
                            <Col xs={16} sm={4} md={4} lg={4} xl={14}>
                              <Form.Item name="description" >
                                  <Input placeholder="Description" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={4} md={4} lg={4} xl={3}>
                              <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Add
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row> 
                          <Badge.Ribbon text={totalTodos}>
                            <Button>{headerMessage}</Button> 
                          </Badge.Ribbon>
                       </Form>
                      </Card>
                    <div className="demo-infinite-container">
                      <InfiniteScroll>
                        <List
                          dataSource={arrayOfTodos}
                          renderItem={item => (
                            <List.Item key={item.id} style={{textAlign: 'left'}}>
                              <List.Item.Meta
                                title={item.title}
                                description={item.description}
                              />
                              {/* <div>Content</div> */}
                              <Button onClick={() => editTodo(item.id)}><EditFilled /></Button>
                              <Button onClick={() => deleteSingleTodo(item.id)}><DeleteFilled /></Button>
                            </List.Item>
                          )}>
                        </List>
                      </InfiniteScroll>
                    </div>
                      <Card className="counting-tag">
                        <Button onClick={() => setViewMode('all')}>All</Button>
                        <Button onClick={() => setViewMode('pending')}>Pending</Button>
                        <Button onClick={() => setViewMode('completed')}>Completed</Button>
                        <Button>Clear Completed</Button>
                      </Card>
                  </Card>
                </Col>
              </Row>
            </Card>
    )
}
