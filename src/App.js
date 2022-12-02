import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

function App() {

  //ToDo List
  const [toDo, setToDo] = useState([]);

  //Temp state
  const [newTask, setNewTask] = useState('');

  //Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('')
    }

  }

  //Delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks)

  }

  //mark task as completed
  const markDone = (id) => {
    const newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);

  }


  return (
    <div className="container App">
      <br /> <br />
      <h1 style={{ color: "#00ff89" }}>ToDo List</h1>
      <br />

      {/* Add Task */}
      <div className="row">
        <div className="col">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={addTask}
            className="btn btn-lg btn-success"
          >Add Task</button>
        </div>
      </div>
      <br />

      {toDo && toDo.length ? '' : <h3>No Tasks...</h3>}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>
                <div className='iconsWrap'>

                  <span title="Completed / Not Completed"
                    onClick={(e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  <span title="Delete" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}
                    />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }


    </div>

  );
}

export default App;
