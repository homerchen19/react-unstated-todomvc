import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TodoTextInput extends Component {
  state = {
    text: this.props.text || '',
  };

  render() {
    const { editing, newTodo, onSave } = this.props;
    const { text } = this.state;

    return (
      <input
        className={classnames({
          edit: editing,
          'new-todo': newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        value={text || ''}
        onBlur={e => {
          if (!newTodo) {
            onSave(e.target.value);
          }
        }}
        onChange={e => {
          this.setState({ text: e.target.value });
        }}
        onKeyDown={e => {
          const text = e.target.value.trim();

          if (e.which === 13) {
            onSave(text);
            if (newTodo) {
              this.setState({ text: '' });
            }
          }
        }}
      />
    );
  }
}

TodoTextInput.propTypes = {
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  text: PropTypes.string,
};
