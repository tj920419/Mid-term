import React, { useState } from 'react';
// import logo from './logo.svg';
import styles from './App.module.scss';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className='todoapp stack-large'>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>{filterList}</div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
}

/*Class second try*/
// let PreSetTasks = [
//   { id: 'todo-0', name: 'Eat', completed: true },
//   { id: 'todo-1', name: 'Sleep', completed: true },
//   { id: 'todo-2', name: 'Repeat', completed: false },
// ];

// class EveryThing extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <form>
//           <h2>What needs to be done?</h2>
//           <input type='text'></input>
//           <button type='submit'>Add</button>
//         </form>
//         <div>
//           <button>Show All tasks</button>
//           <button>Show Active tasks</button>
//           <button>Show Completed tasks</button>
//         </div>
//         <h2>3 tasks remaining</h2>
//         <ul>
//           <li></li>
//           <li></li>
//           <li></li>
//         </ul>
//       </div>
//     );
//   }
// }

// window.addEventListener('load', () => {
//   let RenderEveryThing = React.createElement(EveryThing, null);
//   ReactDOM.render(RenderEveryThing, document.getElementById('root2'));
// });

/*Class first try*/
// class DivSpace extends React.Component {
//   render() {
//     return React.createElement('DIV', null, '');
//   }
// }

// class Title extends React.Component {
//   render() {
//     return React.createElement('H2', null, 'What needs to be done?');
//   }
// }

// class Input extends React.Component {
//   render() {
//     return React.createElement('INPUT', null, '');
//   }
// }

// class EveryThing extends React.Component {
//   render() {
//     let DivSpaceRendering = React.createElement(DivSpace, null);
//     let TitleRendering = React.createElement(Title, null);
//     let InputRendering = React.createElement(Input, null);
//     let EveryThingDetail = [
//       DivSpaceRendering,
//       DivSpaceRendering,
//       TitleRendering,
//       InputRendering,
//     ];
//     return React.createElement('DIV', null, EveryThingDetail);
//   }
// }

// window.addEventListener('load', () => {
//   let RenderEveryThing = React.createElement(EveryThing, null);
//   ReactDOM.render(RenderEveryThing, document.getElementById('root2'));
// });

// // let reactElement = React.createElement('H1', null, 'Hello World!');
// // ReactDOM.render(reactElement, document.getElementById('root2'));

export default App;
