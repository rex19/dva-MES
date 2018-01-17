import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import Input from './Input';


const rootReducer = combineReducers({
  sidebarReducer,
  Input,
});

export default rootReducer;
