import React from 'react'

const TaskCard = (props) => {
    return(
        <div className='taskCard'>
            <h1>{props.todo.task}</h1>
            <button className='completeTask' onClick={() => props.delete(props.todo)}>Task Completed</button>
        </div>
    )
}

export default TaskCard