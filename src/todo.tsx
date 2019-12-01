import React from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip
} from "@material-ui/core";

interface TodoState {
  todos: string[];
  todo: string;
  addButtonState: boolean;
}

export default class Todo extends React.Component<{}, TodoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
      todo: "",
      addButtonState: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.submit = this.submit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { todos } = this.state;
    const changeValue = e.target.value;
    if (changeValue.length === 0) {
      this.setState({ todo: "", addButtonState: false });
      return;
    }
    this.setState({
      todos: todos,
      todo: changeValue,
      addButtonState: true
    });
  }

  submit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      this.addTodo();
    }
  }

  addTodo() {
    const { todos, todo } = this.state;
    if (todo.length === 0) {
      return;
    }
    this.setState({
      todos: todos.concat(todo),
      todo: "",
      addButtonState: false
    });
  }

  removeTodo(index: number) {
    const { todos } = this.state;
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1>ToDo</h1>

        <TextField
          label="ToDoを入力してください"
          value={this.state.todo}
          onKeyDown={this.submit}
          onChange={this.handleChange}
          required
        />
        <Tooltip title="Add">
          <IconButton
            edge="end"
            aria-label="add"
            disabled={!this.state.addButtonState}
            onClick={this.addTodo}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <List>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText primary={todo} />
              <ListItemSecondaryAction>
                <Tooltip title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      this.removeTodo(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
