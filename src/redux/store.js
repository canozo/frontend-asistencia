import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import { loadState, saveState } from './localState';

const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));

store.subscribe(() => {
  // TODO
  console.log(store.getState());
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
