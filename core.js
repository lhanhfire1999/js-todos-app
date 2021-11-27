export default function html([firstString, ...strings], ...values){
  return values.reduce((acc, cur) => acc.concat(cur, strings.shift())
  , [firstString])
  .filter(x => (x ?? x !== true) || x === 0)
  .join('')
}

export function createStore(reducer){
  let state = reducer(); //initialValue
  let roots = new Map();

  const render = () => {
    for(const [root, component] of roots) {
      const output = component() // call fn line 27 => call fn line 28 (App())
      root.innerHTML =output;
    }
  }

  return {
    attach(component, root){
      roots.set(root, component);
      render();
    },
    // selector is function
    subscribe(selector = state => state ){
      return (component) => 
        () => //props, ...args
        component(Object.assign({}, selector(state) )) //props, ...args
    },
    dispatch({action, payload}) {
      state = reducer(state, action, payload); //Update state when dispatch
      render();
    },
  }
}