import React from 'react';
// import logo from './logo.svg';
import './App.module.scss';
import './index.css';
// import styles from './App.module.scss';
// import Form from './components/Form';
// import FilterButton from './components/FilterButton';
// import Todo from './components/Todo';
// import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputtingNewList: false,
      InputNewList: '',
      List: [],
    };
  }

  // let PropsData = this.state.data;

  render() {
    let StateList = this.state.List;
    let ListComponent = [];
    let AddAListArea = [];
    let CardComponent = [];

    /*初始按鈕*/
    let ClickAddAListButton = () => {
      console.log('ClickAddAListButton');
      this.setState({ InputtingNewList: true });
      console.log(this.state);
    };

    /*新增清單*/
    let InputNewList = (e) => {
      console.log(e.target.value);
      this.setState({ InputNewList: e.target.value });
      console.log(this.state);
    };

    let ClickAddListButton = () => {
      console.log('ClickAddListButton');
      if (this.state.InputNewList === '') {
        console.log('Not yet input anything!');
      } else {
        console.log(this.state.InputNewList);
        let NewList = {
          Id: this.state.InputNewList,
          Name: this.state.InputNewList,
          Editing: false,
          Card: [],
          InputNewCard: '',
          NameEditing: false,
          InputNewName: '',
        };

        StateList.push(NewList);
        this.setState({ InputNewList: '', List: StateList });
        console.log(this.state);
      }
    };

    let CancelListInput = () => {
      console.log('CancelListInput');
      this.setState({ InputtingNewList: false });
      console.log(this.state);
    };

    /*調整清單*/
    let EditListName = (e) => {
      console.log('EditListName');
      console.log(e.target.parentNode);
      for (let v = 0; v < StateList.length; v += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[v].Id);

        if (e.target.parentNode.id === v + StateList[v].Id) {
          StateList[v].NameEditing = true;
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
    };

    let InputtingNewListName = (e) => {
      console.log('InputtingNewListName');
      for (let w = 0; w < StateList.length; w += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[w].Id);

        if (e.target.parentNode.id === w + StateList[w].Id) {
          StateList[w].InputNewName = e.target.value;
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
    };

    let SaveNewListName = (e) => {
      console.log('SaveNewListName');
      for (let x = 0; x < StateList.length; x += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[x].Id);

        if (
          e.target.parentNode.id === x + StateList[x].Id &&
          StateList[x].InputNewName !== ''
        ) {
          StateList[x].Name = StateList[x].InputNewName;
          StateList[x].Id = StateList[x].InputNewName;
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
    };

    let CancelListNameEditing = (e) => {
      console.log('CancelListNameEditing');

      for (let y = 0; y < StateList.length; y += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[y].Id);

        if (e.target.parentNode.id === y + StateList[y].Id) {
          StateList[y].NameEditing = false;
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
    };

    let RemoveList = (e) => {
      console.log('RemoveList');
      console.log(e.target.parentNode);
      for (let z = 0; z < StateList.length; z += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[z].Id);

        if (e.target.parentNode.id === z + StateList[z].Id) {
          StateList.splice(z, 1);
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
    };

    //增加卡片
    let ClickAddACardButton = (e) => {
      console.log('ClickAddACardButton');
      for (let a = 0; a < StateList.length; a += 1) {
        if (e.target.parentNode.id === a + StateList[a].Id) {
          StateList[a].Editing = true;
          this.setState({ List: StateList });
        }
      }
      console.log(this.state);
    };

    let InputNewCard = (e) => {
      for (let b = 0; b < StateList.length; b += 1) {
        console.log(e.target.parentNode.id);
        console.log(StateList[b].Id);

        if (e.target.parentNode.id === b + StateList[b].Id) {
          StateList[b].InputNewCard = e.target.value;
          this.setState({ List: StateList });
          console.log(this.state);
        }
      }
      console.log(this.state);
    };

    let ClickAddCardButton = (e) => {
      console.log('ClickAddCardButton');
      for (let c = 0; c < StateList.length; c += 1) {
        if (
          e.target.parentNode.id === c + StateList[c].Id &&
          StateList[c].InputNewCard !== ''
        ) {
          let NewCard = {
            Id: StateList[c].InputNewCard,
            Name: StateList[c].InputNewCard,
          };

          StateList[c].Card.push(NewCard);
          this.setState({ List: StateList });
        }
      }
      console.log(this.state);
    };

    let CancelCardInput = (e) => {
      console.log('CancelCardInput');
      for (let d = 0; d < StateList.length; d += 1) {
        if (e.target.parentNode.id === d + StateList[d].Id) {
          StateList[d].Editing = false;
          this.setState({ List: StateList });
        }
      }
      console.log(this.state);
    };

    //UI rendering
    /*New List + New Card*/
    for (let i = 0; i < StateList.length; i += 1) {
      for (let j = 0; j < StateList[i].Card.length; j += 1) {
        let CardTemplate = (
          <div>
            <div className='CardTitle'>{StateList[i].Card[j].Name}</div>
            {/* <div>{'第' + i + '列' + '第' + j + '行'}</div> */}
          </div>
        );
        CardComponent.push(CardTemplate);
        console.log(CardTemplate);
      }
      if (StateList[i].Editing === false) {
        if (StateList[i].NameEditing === false) {
          let ListComponentViewingTemplate = (
            <div className='ListComponent' id={i + StateList[i].Id}>
              <div className='ListTitle'>{StateList[i].Name}</div>
              {CardComponent}
              <button className='EditListName' onClick={EditListName}>
                Edit List Name
              </button>
              <button className='RemoveList' onClick={RemoveList}>
                Remove List
              </button>
              <button
                className='ClickAddACardButton'
                onClick={ClickAddACardButton}
              >
                + Add a card
              </button>
            </div>
          );
          ListComponent.push(ListComponentViewingTemplate);
          CardComponent = [];
        } else if (StateList[i].NameEditing === true) {
          let ListComponentEditingTemplate = (
            <div className='ListComponent' id={i + StateList[i].Id}>
              <div className='ListTitle'>{StateList[i].Name}</div>
              {CardComponent}
              <input
                className='ListInputArea'
                onChange={InputtingNewListName}
                placeholder='Input new list name!'
              ></input>
              <button onClick={SaveNewListName}>Save New List Name</button>
              <button onClick={CancelListNameEditing}>
                Cancel Name Editing
              </button>
            </div>
          );
          ListComponent.push(ListComponentEditingTemplate);
          CardComponent = [];
        }
      } else if (StateList[i].Editing === true) {
        let ListComponentEditingTemplate = (
          <div className='ListComponent' id={i + StateList[i].Id}>
            <div className='ListTitle'>{StateList[i].Name}</div>
            {CardComponent}
            <input
              className='ListInputArea'
              onChange={InputNewCard}
              placeholder='Input new card!'
            ></input>
            <button className='ClickAddCardButton' onClick={ClickAddCardButton}>
              Add Card
            </button>
            <button className='CancelInputButton' onClick={CancelCardInput}>
              Cancel
            </button>
          </div>
        );
        ListComponent.push(ListComponentEditingTemplate);
        CardComponent = [];
      }
    }

    /*Initial*/
    if (this.state.InputtingNewList === false) {
      let AddAListTemplate = (
        <div>
          <button className='AddAListButton' onClick={ClickAddAListButton}>
            + Add a list
          </button>
        </div>
      );
      AddAListArea.push(AddAListTemplate);
    } else if (this.state.InputtingNewList === true) {
      let AddaListInputTemplate = (
        <div>
          <input
            className='NewListInputArea'
            onChange={InputNewList}
            placeholder='Input new list!'
          ></input>
          <button className='AddListButton' onClick={ClickAddListButton}>
            Add List
          </button>
          <button className='CancelInputButton' onClick={CancelListInput}>
            Cancel
          </button>
        </div>
      );
      AddAListArea.push(AddaListInputTemplate);
    }

    return (
      <div className='All'>
        <div className='AddListButtonGroup'>{AddAListArea}</div>
        <div className='ListComponentGroup'>{ListComponent}</div>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

export default App;
