import storage  from "./util/storage.js";

const initState = {
  todos: storage.get(),
  filter: 'all',
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: null,
}

const actions = {
  Add(state, payload){
    if(!payload) return;

    state.todos.push({id: state.todos.length +1, title: payload, completed: false});
    storage.set(state.todos);
  },
  Destroy(state, toDoId){
    state.todos = state.todos.filter(x => x.id !== toDoId);
    storage.set(state.todos);
  },
  Toggle(state, toDoId){
    state.todos.forEach(todo =>{
      if(todo.id === toDoId){
        todo.completed = !todo.completed;
      }
    })
    storage.set(state.todos);
  },
  ToggleAll(state, status){
    state.todos.forEach(todo => {
      todo.completed = status;
    })
    storage.set(state.todos);
  },
  SwitchFilter(state, filterName){
    state.filter = filterName;
  },
  ClearCompleted(state){
    state.todos = state.todos.filter(todo => !todo.completed);
    storage.set(state.todos);
  },
  OnModeEdit(state, toDoId){
    state.editIndex = toDoId;
  },
  OffModeEdit(state, title){
    if(state.editIndex){
      if(title){
        state.todos.forEach(todo => {
          if(todo.id === state.editIndex){
            todo.title = title;
          }
        })
      }else{
        this.Destroy(state, state.editIndex);
      }
      
      state.editIndex = null;
      storage.set(state.todos);
    }
  },
  CancelEdit(state){
    state.editIndex = null;
  }
}

export default function reducer(state = initState, action, payload) {
  actions[action] && actions[action](state, payload);
  return state;
}