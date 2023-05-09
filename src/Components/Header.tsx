import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { supabase } from "../config/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { TodoContext } from "../Context/TodoContext";

interface Todo {
  title: string;
}

const Header = () => {
  const { fetchTodos } = useContext(TodoContext);
  const [input, setInput] = useState("");

  const extractProjectAndTitle = (input: string) => {
    const pattern = /@\s*([\w\s]+)\./;

    const match = pattern.exec(input);
    let project = "";
    let title = input;

    if (match) {
      project = match[1];
      title = input.replace(match[0], "").trim();
    } else {
      title = input;
      project = "inbox";
    }

    return { title, project };
  };

  const addTodo = async (e: React.FormEvent, input: string): Promise<void> => {
    e.preventDefault();
    const { title, project } = extractProjectAndTitle(input);
    const { data, error }: PostgrestSingleResponse<Todo> = await supabase
      .from("Todo")
      .insert([{ title, project }])
      .single();

    // Trigger fetching todos after successfully adding a new todo.
    if (!error) {
      fetchTodos();
      setInput("");
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link
        to="/"
        className="font-bold text-4xl text-center bg-zinc-700 rounded-md mb-2 py-2"
      >
        <h1 className="font-bold text-4xl text-center bg-zinc-700 rounded-md mb-2 py-2">
          M-Todo
        </h1>
      </Link>
      <div className="flex flex-row gap-2 mb-2">
        <input
          className="w-full rounded-md border-2 border-zinc-500 focus:border-emerald-500 placeholder:text-zinc-500 bg-zinc-700 h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="ADD ITEM"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="bg-zinc-700 hover:bg-emerald-700 duration-200 rounded-md h-12 px-4 text-lg"
          onClick={(e) => addTodo(e, input)}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <Link
          to="/"
          className="bg-zinc-700 hover:bg-emerald-700 duration-200 rounded-md px-4 text-lg flex flex-col gap-2 text-center justify-center py-2 "
        >
          <p className="text-sm">Today</p>
          <p className="font-bold text-4xl">12</p>
        </Link>
        <Link
          to="/"
          className="bg-zinc-700 hover:bg-emerald-700 duration-200 rounded-md px-4 text-lg flex flex-col gap-2 text-center justify-center py-2 "
        >
          <p className="text-sm">This week</p>
          <p className="font-bold text-4xl">5</p>
        </Link>
        <Link
          to="/"
          className="bg-zinc-700 hover:bg-emerald-700 duration-200 rounded-md px-4 text-lg flex flex-col gap-2 text-center justify-center py-2 "
        >
          <p className="text-sm">Completed</p>
          <p className="font-bold text-4xl">3</p>
        </Link>
      </div>
    </>
  );
};
export default Header;
