import React, { useState } from "react";
import { supabase } from "../Config/supabaseClient";

/**
* @author
* @function AddNewTodo


**/

export const AddNewTodo = (props) => {
  const [title, setTitle] = useState("");
  const addNewTodo = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("todos")
      .insert({ title })
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      props.onNewTodo();
      setTitle("");
    }
  };
  return (
    <form className="p-2 m-2" onSubmit={addNewTodo}>
      <input
        type="text"
        className="border-b p-2 rounded-md"
        value={title}
        placeholder="Add new todo..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-md m-2"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
