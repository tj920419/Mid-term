import React, { useState } from 'react';
// import logo from './logo.svg';
// import styles from './App.module.scss';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';

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
      <div
        role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </div>
    </div>
  );
}

/*======================================================
====================Class second try====================
======================================================*/
class EveryThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputTaskEditing: '',
      newTask: {
        Id: '',
        Name: '',
        Completed: false,
        Editing: false,
        Vision: true,
      },
      data: [
        {
          Id: 'Homework',
          Name: 'Homework',
          Completed: false,
          Editing: false,
          Vision: true,
        },
        {
          Id: 'Nap',
          Name: 'Nap',
          Completed: false,
          Editing: false,
          Vision: true,
        },
        {
          Id: 'Exercise',
          Name: 'Exercise',
          Completed: true,
          Editing: false,
          Vision: true,
        },
      ],
    };
  }

  // let PropsData = this.state.data;

  render() {
    let PropsData = this.state.data;
    let ViewTemplateTotal = [];

    //Input New Task
    let InputNewTask = (e) => {
      this.state.newTask.Id = e.target.value;
      this.state.newTask.Name = e.target.value;
    };

    //Click Add New Task
    let AddNewTask = () => {
      PropsData.push(this.state.newTask);
      this.setState({ data: PropsData });
    };

    //Category--All
    let showAll = () => {
      for (let a = 0; a < PropsData.length; a += 1) {
        PropsData[a].Vision = true;
      }
      this.setState({ data: PropsData });
    };

    //Category--Active
    let showActive = () => {
      for (let b = 0; b < PropsData.length; b += 1) {
        if (PropsData[b].Completed === false) {
          PropsData[b].Vision = true;
        } else if (PropsData[b].Completed === true) {
          PropsData[b].Vision = false;
        }
      }
      this.setState({ data: PropsData });
    };

    //Category--Completed
    let showCompleted = () => {
      for (let c = 0; c < PropsData.length; c += 1) {
        if (PropsData[c].Completed === true) {
          PropsData[c].Vision = true;
        } else if (PropsData[c].Completed === false) {
          PropsData[c].Vision = false;
        }
      }
      this.setState({ data: PropsData });
    };

    //check & uncheck
    let ToggleTask = function (id) {
      for (let j = 0; j < PropsData.length; j += 1) {
        if (id === PropsData[j].Id && PropsData[j].Completed === false) {
          PropsData[j].Completed = true;
        } else if (id === PropsData[j].Id && PropsData[j].Completed === true) {
          PropsData[j].Completed = false;
        }
      }
      console.log(PropsData);
    };

    //Edit
    let ActivateEditing = (id) => {
      for (let k = 0; k < PropsData.length; k += 1) {
        if (id === PropsData[k].Id && PropsData[k].Editing === false) {
          PropsData[k].Editing = true;
        } else if (id === PropsData[k].Id && PropsData[k].Editing === true) {
          PropsData[k].Editing = false;
        }
      }
      console.log(PropsData);
      this.setState({ data: PropsData });
    };

    //Input Task Editing
    let InputTaskEditing = (e) => {
      this.state.InputTaskEditing = e.target.value;
    };

    //Cancel Editing
    let CancelEditing = (id) => {
      for (let m = 0; m < PropsData.length; m += 1) {
        this.state.InputTaskEditing = '';
        if (id === PropsData[m].Id) {
          PropsData[m].Editing = false;
        }
      }
      this.setState({ data: PropsData });
    };

    //Save Editing
    let SaveEditing = (id) => {
      for (let n = 0; n < PropsData.length; n += 1) {
        if (id === PropsData[n].Id) {
          PropsData[n].Name = this.state.InputTaskEditing;
          PropsData[n].Id = this.state.InputTaskEditing;
        }
      }
      this.state.InputTaskEditing = '';
      this.setState({ data: PropsData });
    };

    //Delete
    let DeleteTask = (id) => {
      for (let x = 0; x < PropsData.length; x += 1) {
        if (id === PropsData[x].Id) {
          PropsData.splice(x, 1);
        }
      }
      console.log(PropsData);
      this.setState({ data: PropsData });
    };

    //UI rendering
    for (let i = 0; i < PropsData.length; i += 1) {
      if (PropsData[i].Editing === false && PropsData[i].Vision === true) {
        // console.log(PropsData[i]);
        //Viewing mode
        const ViewTemplate = (
          <li className='todo' key={i}>
            <div className='StackSmall'>
              <div className='C-Cb'>
                <input
                  id={PropsData[i].Id}
                  type='checkbox'
                  defaultChecked={PropsData[i].Completed}
                  onChange={function () {
                    ToggleTask(PropsData[i].Id);
                  }}
                />
                <label className='TodoLabel' htmlFor={PropsData[i].Id}>
                  {PropsData[i].Name}
                </label>
              </div>
              <div className='BtnGroup'>
                <button
                  type='button'
                  className='Btn'
                  onClick={() => ActivateEditing(PropsData[i].Id)}
                >
                  Edit{' '}
                  <span className='VisuallyHidden'>{PropsData[i].Name}</span>
                </button>
                <button
                  type='button'
                  className='Btn Btn__Danger'
                  onClick={() => DeleteTask(PropsData[i].Id)}
                >
                  Delete{' '}
                  <span className='VisuallyHidden'>{PropsData[i].Name}</span>
                </button>
              </div>
            </div>
          </li>
        );

        ViewTemplateTotal.push(ViewTemplate);
      } else if (
        PropsData[i].Editing === true &&
        PropsData[i].Vision === true
      ) {
        console.log(PropsData[i]);
        //Editing mode
        const EditingTemplate = (
          <form
            className='StackSmall'
            // onSubmit={HandleSubmit}
          >
            <div className='FormGroup'>
              <label className='TodoLabel' htmlFor={PropsData[i].Id}>
                New name for {PropsData[i].Name}
              </label>
              <input
                id={PropsData[i].Id}
                className='TodoText'
                type='text'
                // value={NewName}
                onChange={InputTaskEditing}
              />
            </div>
            <div className='BtnGroup'>
              <button
                type='button'
                className='Btn TodoCancel'
                onClick={() => CancelEditing(PropsData[i].Id)}
              >
                Cancel renaming {PropsData[i].Name}
                {/* <span className='VisuallyHidden'>
                  renaming {PropsData[i].Name}
                </span> */}
              </button>
              <button
                type='submit'
                className='Btn Btn__Primary TodoEdit'
                onClick={() => SaveEditing(PropsData[i].Id)}
              >
                Save new name for {PropsData[i].Name}
                {/* <span className='VisuallyHidden'>
                  new name for {PropsData[i].Name}
                </span> */}
              </button>
            </div>
          </form>
        );

        ViewTemplateTotal.push(EditingTemplate);
      }
    }

    return (
      <div>
        <form>
          <h2>What needs to be done?</h2>
          <input type='text' onChange={InputNewTask}></input>
          <button type='submit' onClick={AddNewTask}>
            Add
          </button>
        </form>
        <div>
          <button onClick={showAll}>Show All tasks</button>
          <button onClick={showActive}>Show Active tasks</button>
          <button onClick={showCompleted}>Show Completed tasks</button>
        </div>
        <h2>{PropsData.length} tasks remaining</h2>
        <ul>
          {ViewTemplateTotal}
          {/* {this.state.IsEditing ? EditingTemplate : ViewTemplate} */}
        </ul>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  ReactDOM.render(
    <EveryThing />,
    // <EveryThing data={PreSetTasks} number={56} />,
    document.getElementById('root2')
  );
});

export default App;
