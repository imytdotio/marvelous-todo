import { AddNewTodo } from "../Components/AddNewTodo";
// import { Todos } from "./Components/Todos";
import React, { useState, useEffect } from "react";
import { supabase } from "../Config/supabaseClient";
import { TodoBlock } from "../Components/TodoBlock";
import { TodoCol } from "../Components/TodoCol";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [sortedTodos, setSortedTodos] = useState(null);

  const [projects, setProjects] = useState([]);

  // const sortTodos = (data) => {
  //   let projects = [];
  //   data.map((datum) => {
  //     if (!projects.includes(datum.project)) {
  //       projects.push(datum.project);
  //     }
  //   });

  //   let sorted = {};
  //   projects.map((project) => {
  //     sorted[project] = data.filter((datum) => datum.project.includes(project));
  //   });

  //   var sortedList = [];
  //   for (var i in sorted) {
  //     sortedList.push([i, sorted[i]]);
  //   }
  //   setSortedTodos(sortedList);
  // };

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("marvelous-todos").select();
    // .order("created_at")
    // .order("importance", { ascending: false })
    // .order("isCompleted");

    if (error) {
      setError(error);
      console.log(error.message);
    }

    if (data) {
      // console.log(data);
      const unique = [];
      data.forEach((datum) => {
        if (!unique.includes(datum.project)) unique.push(datum.project);
      });
      setProjects(unique);

      // setTodos(data);
      // sortTodos(data);
      setError(null);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="App m-8 max-h-screen">
      <h1 className="text-lg font-bold">Marvelous Todo</h1>
      <AddNewTodo onNewTodo={fetchTodos} />
      {error && <p>{error.message}</p>}
      <div className="mx-auto flex flex-row gap-4 overflow-scroll">
        {/* <TodoCol project="Marvelous-todo" /> */}
        {projects.map((project) => {
          return <TodoCol project={project} key={project} />;
        })}
        {/* {sortedTodos &&
          sortedTodos.map((group) => {
            console.log("g", group);
            return (
              <ul key={group[0]} className="mb-4 flex flex-col gap-2 md:w-56 w-screen">
                <h1 className="text-left font-bold mb-1">{group[0]}</h1>
                {group[1].map((todo) => {
                  return (
                    <TodoBlock
                      title={`${todo.title}`}
                      key={todo.id}
                      id={todo.id}
                      desc={todo.desc}
                      isCompleted={todo.isCompleted}
                      onDelete={(e) => {
                        e.stopPropagation();
                        deleteTodos(todo.id);
                      }}
                      onToggle={(e) => {
                        e.stopPropagation();
                        toggleTodos(todo.id, todo.isCompleted);
                      }}
                    />
                  );
                })}
              </ul>
            );
          })} */}
      </div>
    </div>
  );
};
