// src/store/reducers.js

const initialState = {
    todos: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case 'UPDATE_TODO':
        // Temukan tugas yang akan diperbarui berdasarkan ID
        const updatedTodoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
  
        // Buat salinan tugas yang telah diperbarui
        const updatedTodo = {
          ...state.todos[updatedTodoIndex],
          text: action.payload.text,
        };
  
        // Salin array tugas dengan tugas yang diperbarui
        const updatedTodos = [...state.todos];
        updatedTodos[updatedTodoIndex] = updatedTodo;
  
        return {
          ...state,
          todos: updatedTodos,
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  