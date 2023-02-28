import React, { useState, useEffect } from "react";
import { supabase } from "../Config/supabaseClient";
import { TodoBlock } from "../Components/TodoBlock";

/**
 * @author
 * @function Todos
 **/

export const TodoCol = (props) => {
  const [data, setData] = useState([]);
  const getTodos = async () => {
    const { data, error } = await supabase
      .from("marvelous-todos")
      .select()
      .eq("project", props.project);
    if (error) {
      console.log(error.message);
    }
    if (data) {
      setData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="flex flex-col gap-2 w-screen md:w-48">
      <h1 className="font-bold text-left pl-2">{props.project}</h1>
      {data.map((todo) => {
        return <TodoBlock key={todo.id} id={todo.id} />;
      })}
    </div>
  );
};
