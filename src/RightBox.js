import React from "react";
import ReacDOM from "react-dom";

class RightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      status: false,
    };
  }

  handleChange = (event) => {
    this.setState({ task: event.target.value });
  };

  /** bắt sự kiện "enter" để thêm 1 task mới vào list được chọn */
  handleKeyPressCapture = (event) => {
    if (event.charCode === 13) {
      this.props.handleAddTask(this.state.task);
      this.setState({ task: "" });
    }
  };

  /** Hiện thị toàn bộ task có trong 1 list được chọn */
  displayTasks = () => {
    const tasks = this.props.list.tasks;
    const items = tasks.map((value, index) => {
      return (
        <li
          className="task taskslist__task"
          key={this.props.index + value.name}
        >
          <label
            className="name task__name"
            htmlFor={this.props.index + "-task-" + index}
          >
            <input
              className="status task__status"
              type="checkbox"
              id={this.props.index + "-task-" + index}
              checked={value.status}
              onChange={(event) => {
                this.props.handleTaskChecked(event);
              }}
            ></input>
            {value.status ? <s>{value.name}</s> : value.name}
          </label>
          <div className="options task__options">
            <button
              className="btn options__btn--delete"
              type="button"
              onClick={() => {
                this.props.handleDelete("dtask-" + index);
              }}
            >
              &#10006;
            </button>
          </div>
        </li>
      );
    });

    return <ul className="list taskslist listwrapper__taskslist">{items}</ul>;
  };
  render() {
    const Tasks = this.displayTasks;
    return (
      <div className="rightbox body__rightbox">
        <div className="controlgroup rightbox__controlgroup">
          <span className="rightbox__controlgroup--before">+</span>
          <input
            className="input controlgroup__input--task"
            type="text"
            value={this.state.task}
            placeholder="Add task"
            onChange={this.handleChange}
            onKeyPressCapture={this.handleKeyPressCapture}
            id="newtask"
          ></input>
        </div>

        <div className="listwrapper rightbox__listwrapper">
          {this.props.list !== null && (
            <div className="title listwrapper__title">
              <h3 className="content title__content">{this.props.list.name}</h3>
            </div>
          )}
          {this.props.list !== null && <Tasks />}
        </div>
      </div>
    );
  }
}

export default RightBox;
