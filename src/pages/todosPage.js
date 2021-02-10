import { DeleteFilled, EditFilled } from '@ant-design/icons';import '../App.css';
import { Typography, Card, Layout, Menu, Row, Col, List, Checkbox , Popconfirm, Spin, message, Badge, Form, Input, Button  } from 'antd';
import React , { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { deleteTodo, createTodo, editTodo, deleteMultpleTodos } from '../api'

export const TodosPage = (props) => {
    const { currentUser, userTodos } = props

    const initialTodo = {
        id: '',
        title: '',
        description: '',
        owner_id: '',
        status: ''
    }

    const [viewMode, setViewMode] = useState('all')
    const [activeTodo, setActiveTodo] = useState(initialTodo)
    const [TodoForm] = Form.useForm()
    const [editingMode, setEditingMode] = useState(false)
    const [todos, setTodos] = useState(userTodos)
    const [activeItem, setActiveItem] = useState(null)
    const [addingLoader, setAddingLoader] = useState(false)
    const [deletingLoader, setDeletingLoader] = useState(false)
    const [selectedTodos, setSelectedTodos] = useState([])


    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />
    const spinner = <Spin indicator={antIcon} tip="Please Wait!." />
    var headerMessage = 'Total Tasks'
    var arrayOfTodos
    
    const deleteSingleTodo = async (id) => {
        setDeletingLoader(true)
        try{
            let res = await deleteTodo(id)
            
            if(res.status === 200){
                message.success('One Todo Deletd Successfull.....!!!!')
                console.log(res)
                // setloading(false)
                setDeletingLoader(false)
                const newTodoList = todos.filter((todo) => todo.id !== id)
                setTodos(newTodoList)
              }
        }
        catch (err){
            message.error('Failed To Delete A Todo')
        }

      }
    
    const deleteMultiTodos = async () => {
      setDeletingLoader(true)
      try {
          let res = await deleteMultpleTodos(selectedTodos)

          if (res[selectedTodos.length - 1].status === 200) {
              const remainingTodos = todos.filter((todo) => !selectedTodos.includes(todo.id))
              setTodos(remainingTodos)
              const deleted = selectedTodos.length
              message.success(deleted + ' Todos Deleted')
              setSelectedTodos([])
              setDeletingLoader(false)
          }
      } catch (error) {
          message.error('Some Error Occured')

      }
    }

    const setEditingTodo = (id) => {
      console.log(userTodos)
        message.success('Id To Edit Is '+ id)
        setEditingMode(true)
        const selectedTodo = todos.find((todo) => todo.id === id)
        setActiveTodo(selectedTodo)
        TodoForm.setFieldsValue({
            title: selectedTodo.title,
            description: selectedTodo.description,
        })
    }
    
       const onFinish = async (values) => {
         setAddingLoader(true)
         if(editingMode) {   //OnEditing Existing User
          // const {date_created , id ,  ...rest} = activeTodo  //Remove Extra Data
          
          const editedTodo = {...activeTodo, title : values.title, description : values.description}
          const todoId = activeTodo.id
          try {
            const response = await editTodo(todoId, editedTodo)
            if(response.status === 200){
            message.success('Todo edited Successfull')
            TodoForm.resetFields()
            setEditingMode(false)
            setActiveTodo(initialTodo)
            setAddingLoader(false)
            const newTodoList = todos.map((todo) => todo.id === activeTodo.id ? editedTodo : todo)
            setTodos(newTodoList)
          }
        } catch (error) {
          console.log(error)
        }
      }
      else{ //OnAdding New Todo
        try {
          const newTodo = {...values, owner_id : currentUser.id, status : "False"}
          const response = await createTodo(newTodo)
          if(response.status === 200){
            message.success('One Todo Added Successful')
            // console.log(newTodo)
            // console.log(response)
            const addedTodo = {...newTodo, id : response.data.id}
            // console.log(addedTodo)
            setTodos([...todos, addedTodo])
            TodoForm.resetFields()
            setAddingLoader(false)
          }
        } catch (error) {
          if(error && error.response.data)
           alert(JSON.stringify(error.response.data))
        }
      }

        };

        // const handleTodos = () => {}
      if(viewMode === 'all'){
        arrayOfTodos = todos
        // TodoForm.resetFields()
        // setEditingMode(false)
      }
      else if(viewMode === 'completed'){
        arrayOfTodos = todos.filter((todo) => todo.status === "True")
        headerMessage = 'Completed Tasks'
      }
      else if(viewMode === 'pending'){
        arrayOfTodos = todos.filter((todo) => todo.status === "False")
        headerMessage = 'Pending Tasks'
      }
    
      const handleSelectedTodos = (todoId) => {
        const isSelected = selectedTodos.find((todo) => todo === todoId)
        if(isSelected){
          const newSelectedList = selectedTodos.filter((todo) => todo !== todoId)
          setSelectedTodos(newSelectedList)
        }
        else{
          setSelectedTodos([...selectedTodos, todoId])
        }
      }

      return (
       <Card className="outer-card">
              <Row>
                <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 6, span: 12}}>
                  <Card className="inner-card" title = "Add, Edit Or Delete Todo">
                      <Card className="form-card" >
                      {addingLoader ? spinner : 
                        <Form
                          name="normal_login"
                          className="todo-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          form={TodoForm}
                          >
                          <Row>
                            <Col xs={8} sm={4} md={4} lg={4} xl={6}>
                              <Form.Item
                                  name="title"
                                  rules={[{ required: true, message: 'Please input Title!' }]} >
                                  <Input placeholder="Title" autoFocus />
                              </Form.Item>
                            </Col>
                            <Col xs={16} sm={4} md={4} lg={4} xl={14}>
                              <Form.Item name="description" >
                                  <Input placeholder="Description" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={4} md={4} lg={4} xl={3}>
                              <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" loading={addingLoader}>
                                {editingMode? 'Save' : 'Add'}
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row> 
                          <Badge.Ribbon text={arrayOfTodos.length}>
                            <Button>{headerMessage}</Button> 
                          </Badge.Ribbon>
                       </Form> }
                      </Card>
                    <div className="demo-infinite-container">
                      <InfiniteScroll>
                        <List
                          dataSource={arrayOfTodos}
                          renderItem={item => (
                            <List.Item key={item.id} style={{textAlign: 'left'}} onMouseEnter={() => setActiveItem(item.id)} onMouseLeave={() => setActiveItem(null)}>
                              <List.Item.Meta
                                title={item.title}
                                description={item.description}
                                className={item.status === "True" ? 'completedTask' : null}
                              />
                              {/* <div>Content</div> */}
                            {activeItem === item.id ? <>
                            <Button onClick={() => setEditingTodo(item.id)}><EditFilled /></Button> 
                            <Popconfirm title="Sure to delete?" onConfirm={() => deleteSingleTodo(item.id)}>
                              <Button type="danger" loading={deletingLoader}> <DeleteFilled /> </Button>
                            </Popconfirm>
                              </>
                              : null }
                              <Checkbox onClick={() => handleSelectedTodos(item.id)}/>
                            </List.Item>
                          )}>
                        </List>
                      </InfiniteScroll>
                    </div>
                      <Card className="counting-tag">
                        <Button onClick={() => setViewMode('all')}>All</Button>
                        <Button onClick={() => setViewMode('pending')}>Pending</Button>
                        <Button onClick={() => setViewMode('completed')}>Completed</Button>
                        <Button onClick={() => deleteMultiTodos()} loading={deletingLoader} disabled={selectedTodos.length > 0 ? false : true}>Clear Completed</Button>
                        <Button disabled={true}>{selectedTodos.length} Selected</Button>
                      </Card>
                  </Card>
                </Col>
              </Row>
            </Card>
    )
}
