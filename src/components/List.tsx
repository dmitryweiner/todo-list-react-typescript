import React, { useContext } from "react";
import { TodoContext } from "../App";
import Item from "./Item";

export default function List() {
  const context = useContext(TodoContext);
  return <ul>
    {context.todos.map(todo =>
      <Item
        key={todo.id}
        id={todo.id}
        title={todo.title}
        checked={todo.checked}
      />
    )}
  </ul>
}