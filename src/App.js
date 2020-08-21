import React from "react";
import ReacDOM from "react-dom";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

function newList(listname) {
  return {
    name: listname,
    tasks: [],
  };
}

function newTask(task, status = false) {
  return {
    name: task,
    status: status,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      name: "",
      // selectedIndex: index của todolist item (leftbox)
      selectedIndex: -1,
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  /** thêm list hoặc sửa tên list */
  handleAddList = (newName = null) => {
    if (this.state.name !== "") {
      let list = newList(this.state.name);
      this.setState((state) => ({
        toDoList: [...state.toDoList, list],
        name: "",
      }));
      console.log("Add List Successed!");
    } else {
      let tempArr = this.state.toDoList;
      tempArr[this.state.selectedIndex].name = newName;
      this.setState({ toDoList: tempArr });
      console.log("Rename Successed!");
    }
  };

  handleListClick = (index) => {
    try {
      this.setState({ selectedIndex: index });
    } catch (err) {
      console.log("Element Not Support!");
      return;
    }
  };

  handleAddTask = (task) => {
    if (task !== "" && this.state.selectedIndex > -1) {
      let tasksitem = newTask(task);
      let todolist = this.state.toDoList;
      todolist[this.state.selectedIndex].tasks.push(tasksitem);
      this.setState({ toDoList: todolist });
      console.log("Task added!");
    } else {
      alert("List Not Avaliable!");
    }
  };

  handleTaskChecked = (event) => {
    /** <input> id = listIndex-task-taskIndex */
    let target = event.target;
    let splitID = target.id.split("-");
    let length = splitID.length;
    if (length > 0) {
      let tempArr = this.state.toDoList;
      tempArr[parseInt(splitID[0])].tasks[
        parseInt(splitID[length - 1])
      ].status = target.checked;
      this.setState({ toDoList: tempArr });
    }
  };

  handleDelete = (str = null) => {
    if (str === null) return;
    let splitArr = str.split("-");
    let index = parseInt(splitArr[splitArr.length - 1]);
    /** delete list case */
    if (splitArr[0] === "dlist" && isNaN(index) !== true) {
      this.setState((state) => ({
        toDoList: state.toDoList.filter((val, i) => {
          return i !== index;
        }),
        selectedIndex: -1,
      }));
      console.log(`List ${this.state.selectedIndex} deleted!`);
      return;
    }
    /** delete task case */
    if (splitArr[0] === "dtask" && isNaN(index) !== true) {
      let tempArr = [...this.state.toDoList];
      tempArr[this.state.selectedIndex].tasks.splice(index, 1);
      this.setState({ toDoList: tempArr });
      console.log(
        `Task ${index} from List ${this.state.selectedIndex} deleted!`
      );
      return;
    }
  };

  render() {
    const curList =
      this.state.selectedIndex > -1
        ? this.state.toDoList[this.state.selectedIndex]
        : null;
    return (
      <div className="todoapp">
        <div className="todoapp__header">
          <div className="title header__title">
            <h1 className="content title__content">To Do App</h1>
          </div>
        </div>

        <div className="todoapp__body">
          {/*Left Box */}
          <LeftBox
            name={this.state.name}
            listNameEnter={this.handleChange}
            handleAddList={this.handleAddList}
            todolist={this.state.toDoList}
            handleListClick={this.handleListClick}
            handleDelete={this.handleDelete}
          />
          {/*Right Box */}
          <RightBox
            index={this.state.selectedIndex}
            list={curList}
            handleAddTask={this.handleAddTask}
            handleDelete={this.handleDelete}
            handleTaskChecked={this.handleTaskChecked}
          />
        </div>
      </div>
    );
  }
}

export default App;
