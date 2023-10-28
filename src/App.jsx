// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
// import TodoList from './components/TodoList';
// Correct import statement with the right casing
import TodoList from './components/TodoList';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
