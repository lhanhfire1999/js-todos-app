import html from '../core.js';
import {subscribe} from '../store.js'

import TodoItem from './TodoItem.js';

function TodoList({todos, filter, filters, editIndex}) {
  return html`
    <section class="main">
      <input id="toggle-all"
        class="toggle-all"
        type="checkbox"
        onchange="dispatch({action: 'ToggleAll', payload: this.checked})"
        ${todos.every(todo => todo.completed) && 'checked'}
      >
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${todos.filter(filters[filter]).map((todo) => TodoItem(todo, editIndex))}
      </ul>
    </section>
  `
}

export default subscribe()(TodoList);
/** the same
 * const subscriber = subscribe()
 * subscriber(TodoList)
 */
 

