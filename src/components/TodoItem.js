import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import classnames from 'classnames';

import TodoTextInput from './TodoTextInput';

import TodoContainer from '../containers/TodoContainer';

export default class TodoItem extends Component {
  state = {
    editing: false,
  };

  renderElement = todo => {
    const { todo: { id, text, completed } } = this.props;
    const { editing } = this.state;

    if (editing) {
      return (
        <TodoTextInput
          text={text}
          editing
          onSave={text => {
            if (text.length === 0) {
              todo.delete(id);
            } else {
              todo.edit(id, text);
            }

            this.setState({ editing: false });
          }}
        />
      );
    } else {
      return (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => todo.complete(id)}
          />
          <label
            onDoubleClick={() => {
              this.setState({ editing: true });
            }}
          >
            {text}
          </label>
          <button className="destroy" onClick={() => todo.delete(id)} />
        </div>
      );
    }
  };

  render() {
    const { todo: { completed } } = this.props;
    const { editing } = this.state;

    return (
      <Subscribe to={[TodoContainer]}>
        {todo => (
          <li
            className={classnames({
              completed,
              editing,
            })}
          >
            {this.renderElement(todo)}
          </li>
        )}
      </Subscribe>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};
