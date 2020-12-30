import React, { Component } from 'react'
import TaskCard from './Components/TaskCard'
import './main.css'
import axios from 'axios'

class App extends Component {

  state = {
    todos: [],
    newTask: ''
  }

  getTask = () => {
    axios.get('http://localhost:5000/api/gettodo')
    .then((result) => {
      console.log(result)
      let todoList = []
      if(result.data.length !== 0){
        result.data.forEach(todoObject => {
          const todo = {
            id: todoObject._id,
            task: todoObject.todo
          }
          todoList.push(todo)
        })
        console.log(todoList)
      }
      return todoList
    })
    .then( todoList => {
      this.setState({
        todos: todoList
      })
    })
  }

  taskCompletedClick = (todo) => {
    const url = 'http://localhost:5000/api/deletetodo/'+todo.id
    axios.delete(url).then(() => {
      alert('Task deleted ' + todo.name)
      this.setState()
    })
  }

  addTask = (eve) => {
    this.setState({
      newTask: eve.target.value
    })
  }

  addTaskButtonClick = (eve) => {
    // alert('Add task button clicked')
    eve.preventDefault()
    axios.post('http://localhost:5000/api/addtodo', {todo: this.state.newTask})
    .then(() => {
      this.setState(() => alert('Task Added'))
    })
    .catch((error) => alert('Error: Task not added'))
  }

  render(){
    this.getTask()
    // if (isLoggedIn) {
    //   button = <LogoutButton onClick={this.handleLogoutClick} />;
    // } else {
    //   button = <LoginButton onClick={this.handleLoginClick} />;
    // }
    return(
      <div>
        <div className='formContainer'>
          <form onSubmit={this.addTaskButtonClick}>
            <input type = "text" placeholder = "Enter the task" onChange={this.addTask}/>
            <button className='addTask'>Add Task</button>
          </form>
        </div>
        <div className='todoList'>
          {this.state.todos.map( todo => <TaskCard todo = {todo} delete = {this.taskCompletedClick}/> )}
        </div>
        {/* {this.state.newTask} */}
      </div>
    )
  }
}

export default App;
