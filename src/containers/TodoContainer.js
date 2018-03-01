import { Container } from 'unstated';

const initialTodos = [
  {
    text: 'Use Unstated',
    completed: true,
    id: 0,
  },
];

class TodoContainer extends Container {
  state = {
    todos: initialTodos,
  };

  add(text) {
    const { todos } = this.state;

    todos.unshift({
      id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: text,
    });

    this.setState({
      todos,
    });
  }

  delete(id) {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.id !== id),
    });
  }

  edit(id, text) {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(todo => (todo.id === id ? { ...todo, text } : todo)),
    });
  }

  complete(id) {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  }

  completeAll() {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(todo => ({ ...todo, completed: true })),
    });
  }

  clearCompleted() {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.completed === false),
    });
  }
}

export default TodoContainer;
