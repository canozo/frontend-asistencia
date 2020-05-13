import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';
import attendance from './attendance';

export {
  auth,
  signup,
  attendance,
};

const rootReducer = combineReducers({
  auth,
  signup,
  attendance,
});
export default rootReducer;
