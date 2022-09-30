import React, { useContext } from "react";
import { TodoContext } from "../App";

type ItemProps = {
  id: string;
  checked: boolean;
  title: string;
};

const Item = React.memo(function ({id, checked, title}: ItemProps) {
  const context = useContext(TodoContext);
  return <li><input
      type="checkbox"
      checked={checked}
      onChange={() => context.handleCheck(id)}
    />
    {title}
    <button onClick={() => context.handleDelete(id)}>🗑️</button>
  </li>;
});

export default Item;