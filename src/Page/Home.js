import { AddNewTodo } from "../Components/AddNewTodo";
// import { Todos } from "./Components/Todos";
import React, { useState, useEffect } from "react";
import { supabase } from "../Config/supabaseClient";
import { TodoBlock } from "../Components/TodoBlock";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [sortedTodos, setSortedTodos] = useState(null);

  const sortTodos = (data) => {
    let projects = [];
    data.map((datum) => {
      if (!projects.includes(datum.project)) {
        projects.push(datum.project);
      }
    });

    let sorted = {};
    projects.map((project) => {
      sorted[project] = data.filter((datum) => datum.project.includes(project));
    });

    var sortedList = [];
    for (var i in sorted) {
      sortedList.push([i, sorted[i]]);
    }
    setSortedTodos(sortedList);
  };

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .order('created_at')
      .order("importance", { ascending: false })
      .order("isCompleted");

    if (error) {
      setError(error);
      console.log(error.message);
    }

    if (data) {
      setTodos(data);
      sortTodos(data);
      setError(null);
    }
  };

  const deleteTodos = async (id) => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      setError(error);
    }

    if (data) {
      setError(null);
      console.log(data);
      fetchTodos();
    }
  };

  const toggleTodos = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ isCompleted: !isCompleted })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="App m-8">
      <h1 className="text-lg font-bold">Marvelous Todo</h1>
      <AddNewTodo onNewTodo={fetchTodos} />
      {error && <p>{error.message}</p>}
      <ul className="mx-auto md:w-1/3 w-full">
        {sortedTodos &&
          sortedTodos.map((group) => {
            return (
              <div key={group[0]} className='mb-4'>
                <h1 className="text-left font-bold mb-1">{group[0]}</h1>
                {group[1].map((todo) => {
                  return (
                    <TodoBlock
                      title={`${todo.title}`}
                      key={todo.id}
                      id={todo.id}
                      desc={todo.desc}
                      isCompleted={todo.isCompleted}
                      onDelete={() => deleteTodos(todo.id)}
                      onToggle={() => toggleTodos(todo.id, todo.isCompleted)}
                    />
                  );
                })}
              </div>
            );
          })}
      </ul>
    </div>
  );
};
