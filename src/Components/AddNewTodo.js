import React, { useState } from "react";
import { supabase } from "../Config/supabaseClient";

/**
* @author
* @function AddNewTodo


**/

export const AddNewTodo = (props) => {
  const [_title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [project, setProject] = useState("");
  const [importance, setImportance] = useState(0);

  const addNewTodo = async (e) => {
    e.preventDefault();

    const title = _title
      .replace(project, "")
      .replace("@" + ";", "")
      .replaceAll("!", "");

    const { data, error } = await supabase
      .from("marvelous-todos")
      .insert({ title, project, importance })
      .select();

    if (error) {
      console.log(error.message);
      setError(error);
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
        value={_title}
        placeholder="Add new todo..."
        onChange={(e) => {
          const substring = e.target.value.substring(
            e.target.value.indexOf("@") + 1,
            e.target.value.indexOf(";")
          );
          // setTitle(e.target.value.replace(substring, ""));
          setTitle(e.target.value);

          const importance = (e.target.value.match(new RegExp("!", "g")) || [])
            .length;
          substring.trim() ? setProject(substring) : setProject("Blank");
          setImportance(importance);
        }}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded-md m-2"
        type="submit"
      >
        Add
      </button>
      {error ? error.message : ""}
    </form>
  );
};
