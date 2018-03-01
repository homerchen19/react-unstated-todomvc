import React, { Component } from 'react';
import { Subscribe } from 'unstated';

import TodoTextInput from './TodoTextInput';

import TodoContainer from '../containers/TodoContainer';

export default class Header extends Component {
  render() {
    return (
      <Subscribe to={[TodoContainer]}>
        {todo => (
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              newTodo
              onSave={text => {
                if (text.length !== 0) {
                  todo.add(text);
                }
              }}
              placeholder="What needs to be done?"
            />
          </header>
        )}
      </Subscribe>
    );
  }
}
