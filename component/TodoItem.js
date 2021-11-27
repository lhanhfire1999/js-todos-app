import html from '../core.js';

function TodoItem(props, editIndex) {
  const {id, title, completed} = props;
  return html`
    <li class="${completed && 'completed'} ${editIndex === id && 'editing'}">
      <div class="view">
        <input 
          class="toggle" 
          type="checkbox" 
          onchange="dispatch({action: 'Toggle', payload: ${id}})"
          ${completed && 'checked'}>
        <label 
          onclick="dispatch({action: 'OnModeEdit', payload: ${id}})"
        >
          ${title}
        </label>
        <button 
          class="destroy"
          onclick="dispatch({action: 'Destroy', payload: ${id}})"
        >
        </button>
      </div>
      <input 
        class="edit" 
        value="${title}"
        onblur="dispatch({action: 'OffModeEdit', payload: this.value.trim()})"
        onkeyup="event.keyCode === 13 && dispatch({action: 'OffModeEdit', payload: this.value.trim()}) || event.keyCode === 27 && dispatch({action: 'CancelEdit'})"
      >
    </li>
  `
}

export default TodoItem;

