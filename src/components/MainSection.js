import React, { Component } from 'react';
import { Subscribe } from 'unstated';

import TodoItem from './TodoItem';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

import TodoContainer from '../containers/TodoContainer';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
};

export default class MainSection extends Component {
  state = { filter: SHOW_ALL };

  handleShow = filter => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount, todo) {
    const todosLength = todo.state.todos.length;

    if (todosLength > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosLength}
          onChange={todo.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount, todo) {
    const { filter } = this.state;

    const todosLength = todo.state.todos.length;
    const activeCount = todosLength - completedCount;

    if (todosLength) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={() => {
            todo.clearCompleted();
          }}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { filter } = this.state;

    return (
      <Subscribe to={[TodoContainer]}>
        {todo => {
          const filteredTodos = todo.state.todos.filter(TODO_FILTERS[filter]);
          const completedCount = todo.state.todos.reduce(
            (count, _todo) => (_todo.completed ? count + 1 : count),
            0
          );

          return (
            <section className="main">
              {this.renderToggleAll(completedCount, todo)}
              <ul className="todo-list">
                {filteredTodos.map(_todo => (
                  <TodoItem key={_todo.id} todo={_todo} />
                ))}
              </ul>
              {this.renderFooter(completedCount, todo)}
            </section>
          );
        }}
      </Subscribe>
    );
  }
}
