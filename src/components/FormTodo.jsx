/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, filterTodo } from "../redux/reducers/todo-reducer";
import ListTodo from "./listTodo";

const FormTodo = () => {
  const { isEdit, todos, filter, filterType } = useSelector(
    (state) => state.todos
  );
  const { ALL, ACTIVE, COMPLETED } = filterType;

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input === "") {
      setAlert(true);

      setTimeout(() => {
        setAlert(false)
      }, 2000);
      return false;
    }
    if (!isEdit) {
      dispatch(addTodo(input));
    } else {
      dispatch(editTodo(input));
    }

    setInput("");

    if (filter === "active") {
      dispatch(filterTodo(ACTIVE));
    } else if (filter === "completed") {
      dispatch(filterTodo(COMPLETED));
    }
  };

  const [alert, setAlert] = useState(false);

  return (
    <div className="pt-20">
      <h1 className="font-semibold text-4xl text-slate-600 mb-10">
        What&apos;s the plan for today
      </h1>

      {/* <button onClick={() => setAlert(!alert)}>alert woiiiii</button> */}

      <div
        role="alert"
        className={`absolute top-5 right-10 transition-all duration-500 ease-in-out shadow-2xl drop-shadow-lg ${
          alert === true ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          ERROR
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>Input tidak boleh kosong.</p>
        </div>
      </div>

      <form className="flex">
        <input
          className="grow rounded-md p-3 border-2 border-slate-400 bg-transparent text-slate-700"
          type="text"
          placeholder="what to do"
          value={input}
          onChange={handleChange}
        />
        <button
          className="px-3 py-2 rounded-md bg-sky-700 hover:bg-sky-900 ml-4 text-white"
          onClick={handleSubmit}
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </form>

      {/* render list todo */}
      <ListTodo setInput={setInput} />
    </div>
  );
};

export default FormTodo;
