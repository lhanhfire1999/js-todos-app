export default function logger(reducer) {
  return (prevState, action, payload) => {
    console.group('Action', action);
    console.log('Prev State: ', prevState);
    console.log('Payload', payload);
    const newState = reducer(prevState, action, payload);
    console.log('Next State: ', newState);
    console.groupEnd();
    return newState;
  }
}