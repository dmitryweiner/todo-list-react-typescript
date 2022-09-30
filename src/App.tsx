import { nanoid } from "nanoid";
import React, { createContext, FormEvent, useCallback, useState } from 'react';
import './App.css';
import List from "./components/List";
import { Context, Filter, Todo, TodoList } from "./interfaces";

export const TodoContext = createContext<Context>({
  todos: [],
  handleCheck: id => {},
  handleDelete: id => {}
});

function App() {
  console.log("render");
  const [todos, setTodos] = useState<TodoList>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: nanoid(),
      title: input,
      checked: false
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  const handleDelete = useCallback((id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }, [todos]);

  const handleCheck = useCallback((id: string) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, checked: !todo.checked};
      }
      return todo;
    });
    setTodos(newTodos);
  }, [todos]);

  const getFiltered = () => {
    switch (filter) {
      case Filter.ALL:
        return todos;
      case Filter.DONE:
        return todos.filter(todo => todo.checked);
      case Filter.NOT_DONE:
        return todos.filter(todo => !todo.checked);
      default:
        return todos;
    }
  }

  return (
    <TodoContext.Provider value={{todos: getFiltered(), handleCheck, handleDelete}}>
    <div className="App">
      <h3>TodoList v0.3</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
        style={{width: "100px"}}/>
        <button type="submit">Сохранить</button>
      </form>
      {Object.values(Filter).map(filterValue => <label>
        <input
          name="filter"
          type="radio"
          value={filterValue}
          checked={filterValue === filter}
          onChange={() => setFilter(filterValue)}
        />
        {filterValue}
      </label>)}
      <List />
    </div>
    </TodoContext.Provider>
  );
}

export default App;
