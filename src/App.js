import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header";// just checked if i can work whem the file extension is added
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
// import About from "./components/About";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

    }
    getTasks()
  }, [])


  // Fetch Task
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Reminder Toggle
  const toggleReminder = async (id) => {
    const fetchedTasks = await fetchTasks()

    fetchedTasks.map(task => (
      task.id === id ? update({ ...task, reminder: !task.reminder }, id) : ''))


  }

  const update = async (updTask, id) => {
    let res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    let data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  // Add Task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json()

    setTasks([...tasks, data])



    // No more need for the for the below expression  
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id,...task}
    // setTasks([...tasks, newTask])


  }



  return (
    // <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        {/* <Routes> */}
          {/* <Route path='/' exact render={(props) => ( */}
            {/* <> */}
              {showAddTask ? <AddTask onAdd={addTask} /> : ''}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task Available'}
            {/* </> */}
          {/* // )} /> */}
          {/* <Route path='/about' element={<About/>} /> */}
        {/* </Routes> */}
        <Footer />
      </div>
    // </Router>
  );
}

export default App;





// the class style of exportimg a component
// import React, { Component } from 'react'

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         this is me
//       </div>
//     )
//   }
// }
