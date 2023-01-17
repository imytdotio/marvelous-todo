import React from "react";
import { Link } from "react-router-dom";

/**
 * @author
 * @function
 **/

export const TodoBlock = (props) => {
  return (
    <li className="flex gap-2 text-left">
      <button className="flex-none" onClick={props.onToggle}>
        {props.isCompleted ? "✅" : "❌"}
      </button>
      <h1
        className={`flex-1 ${
          props.isCompleted ? "line-through text-gray-300" : "text-black"
        }`}
      >
        {props.title}
      </h1>
      <Link to={`/${props.id}`}>
        <button>✏️</button>
      </Link>
      <button onClick={props.onDelete}>🗑</button>
    </li>
  );
};
