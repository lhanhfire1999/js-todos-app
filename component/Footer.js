import html from '../core.js';
import {subscribe} from '../store.js';

function Footer({todos, filter, filters}) {
  return html`
    <footer class="footer">
      <span class="todo-count"><strong>${todos.filter(todo => todo.completed).length}</strong> item left</span>
      <ul class="filters">
        ${Object.keys(filters).map(type => html`
          <li>
            <a 
              class="${type === filter && 'selected'}" 
              onclick="dispatch({action: 'SwitchFilter', payload: '${type}'})"
              href="#/"
            >
              ${type[0].toUpperCase() + type.slice(1)}
            </a>
          </li>
        `)}
        
      </ul>
      ${ todos.filter(todo => todo.completed).length > 0 && 
        html`
        <button 
          class="clear-completed"
          onclick="dispatch({action: 'ClearCompleted'})"
        >
          Clear completed
        </button>` 
      }
      
    </footer>
  `
}

export default subscribe()(Footer);

