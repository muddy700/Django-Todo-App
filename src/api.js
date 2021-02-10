import axios from 'axios'
import baseLink from './base'

// http: //localhost:8000 /api/ todos/
// http: //localhost:8000 /api/ users/
// http: //localhost:8000 /api/ profiles/

// For Users
export async function fetchAllUsers() {
    const response = await baseLink.get("users")
    return response.data
}

export async function authenticateUser(name, password) {
    const response = await baseLink.get(`users/authorization/${name}/${password}`)
    return response
}

export async function getSingleUser(id) {
    const response = await baseLink.get(`users/${id}`)
    return response
}

export async function createUser(payload) {
    const response = await baseLink.post("users/", payload )
    return response
}

export async function deleteUser(id) {
    const response = await baseLink.delete(`users/${id}`)
    return response
}

export async function editUser(id, payload) {
    const response = await baseLink.put(`users/${id}`, null, {
        params: payload
    })
    return response
}

export async function deleteMult(payloasds) {
    const requests = payloasds.map((item) => baseLink.delete(`users/${item}`))
    const responseArray = await axios.all([...requests])
    return responseArray
}


// For Todos
export async function fetchAllTodos() {
    const response = await baseLink.get("todos/")
    return response.data
}

export async function fetchUserTodos(userId) {
    const response = await baseLink.get(`todos/user/${userId}`)
    return response.data
}

export async function createTodo(payload) {
    const response = await baseLink.post("todos/", payload )
    return response
}

export async function deleteTodo(id) {
    const response = await baseLink.delete(`todos/${id}`)
    return response
}

export async function deleteMultpleTodos(payloasds) {
    const requests = payloasds.map((todo) => baseLink.delete(`todos/${todo}`))
    const responseArray = await axios.all([...requests])
    return responseArray
}

export async function editTodo(id, payload) {
    const response = await baseLink.put(`todos/${id}`, payload )
    return response
}