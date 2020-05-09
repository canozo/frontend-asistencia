import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';

export {
  auth,
  signup,
};

const rootReducer = combineReducers({
  auth,
  signup,
});
export default rootReducer;
