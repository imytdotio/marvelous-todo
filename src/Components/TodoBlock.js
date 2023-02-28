import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Config/supabaseClient";

/**
 * @author
 * @function
 **/

export const TodoBlock = ({ id }) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({});

  const fetchTodo = async () => {
    const { data, error } = await supabase
      .from("marvelous-todos")
      .select()
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setTodo(data[0]);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const deleteTodos = async () => {
    const { data, error } = await supabase
      .from("marvelous-todos")
      .select()
      .eq("id", id);

    if (error) {
      // setError(error);
      console.log(error);
    }

    if (data) {
      // setError(null);
      console.log(error);
      console.log(data);
      fetchTodo();
    }
  };

  const toggleTodos = async (isCompleted) => {
    const { data, error } = await supabase
      .from("marvelous-todos")
      .update({ isCompleted: !isCompleted })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      fetchTodo();
    }
  };

  return (
    <li
      className="flex gap-2 text-left border rounded-md border-slate-200 p-2 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${todo.id}`);
      }}
    >
      <button
        className="flex-none"
        onClick={(e) => {
          e.stopPropagation();
          toggleTodos(todo.isCompleted);
        }}
      >
        {todo.isCompleted ? "✅" : "❌"}
      </button>
      <h1
        className={`flex-1 ${
          todo.isCompleted ? "line-through text-gray-300" : "text-black"
        }`}
      >
        {todo.title}
      </h1>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodos();
        }}
        // className="md:inline collapse"
      >
        🗑
      </button>
    </li>
  );
};
