import React from "react";
import ReacDOM from "react-dom";

class LeftBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
    };
  }

  handleKeyPressCapture = (event) => {
    if (event.charCode === 13) {
      let target = event.target;
      this.props.handleAddList(this.state.newName);
    }
  };

  handleDoubleClick = (event) => {
    let target = event.target;
    let newNameInput = event.target.nextElementSibling;
    newNameInput.value = target.innerText;
    target.style.display = "none";
    newNameInput.style.display = "block";
    newNameInput.focus();
    newNameInput.select();
  };

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  };

  handleOnBlur = (event) => {
    const target = event.target;
    this.props.handleAddList(this.state.newName);
    this.setState({ newName: "" });
    target.style.display = "none";
    target.previousElementSibling.style.display = "flex";
  };
  /** Show all elements in toDoList*/
  displayList = () => {
    let listItems = this.props.todolist.map((value, index) => {
      return (
        <li className="item todolist__item" key={"todolist" + index}>
          <div className="name__wrapper">
            <a
              className="name item__name"
              onClick={() => {
                this.props.handleListClick(index);
              }}
              onDoubleClick={this.handleDoubleClick}
            >
              {value.name}
            </a>
            <input
              className="input controlgroup__input--newname"
              value={this.state.newName}
              type="text"
              onChange={this.handleNameChange}
              onKeyPressCapture={this.handleKeyPressCapture}
              onBlur={this.handleOnBlur}
            ></input>
          </div>
          <div className="options item__options">
            <button
              className="btn options__btn--delete"
              type="button"
              onClick={() => {
                this.props.handleDelete("dlist-" + index);
              }}
            >
              &#10006;
            </button>
          </div>
        </li>
      );
    });
    return <ul className="list todolist listwrapper__todolist">{listItems}</ul>;
  };

  render() {
    let ToDoList = this.displayList;
    return (
      <div className="lefbox body__leftbox">
        <div className="controlgroup leftbox__controlgroup">
          <input
            className="input controlgroup__input--name"
            type="text"
            value={this.props.name}
            placeholder="Add list"
            onKeyPressCapture={this.handleKeyPressCapture}
            onChange={this.props.listNameEnter}
          ></input>
        </div>
        <div className="listwrapper leftbox__listwrapper">
          {/*To Do List place here */}
          <ToDoList />
        </div>
      </div>
    );
  }
}

export default LeftBox;
