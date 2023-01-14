import { AddNewTodo } from "../Components/AddNewTodo";
// import { Todos } from "./Components/Todos";
import { useState, useEffect } from "react";
import { supabase } from "../Config/supabaseClient";
import { TodoBlock } from "../Components/TodoBlock";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select();

    if (error) {
      setError(error);
      console.log(error.message);
    }

    if (data) {
      setTodos(data);
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
        {todos.map((todo) => (
          <TodoBlock
            title={todo.title}
            key={todo.id}
            id={todo.id}
            desc={todo.desc}
            isCompleted={todo.isCompleted}
            onDelete={() => deleteTodos(todo.id)}
            onToggle={() => toggleTodos(todo.id, todo.isCompleted)}
          />
        ))}
      </ul>
    </div>
  );
};
