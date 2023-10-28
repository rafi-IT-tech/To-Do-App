// src/store/index.js

import { createStore, combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import todoReducer from '../reducer/reducer';

const rootReducer = combineReducers({
  todos: todoReducer,
}); 

const store = createStore(rootReducer);

export default store;
