import { combineReducers } from 'redux';
import auth from './auth';

export {
  auth,
};

const rootReducer = combineReducers({
  auth,
});
export default rootReducer;
