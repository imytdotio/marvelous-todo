import logo from "./logo.svg";
import "./App.css";
import { AddNewTodo } from "./Components/AddNewTodo";
import { Todos } from "./Components/Todos";
import { useState, useEffect } from "react";
import { supabase } from "./Config/supabaseClient";
import { TodoBlock } from "./Components/TodoBlock";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select();

    if (error) {
      setError(error);
      console.log(error.message);
    }

    if (data) {
      console.log(data);
      setTodos(data);
      setError(null);
    }
  };

  const deleteTodos = async (id) => {
    console.log(id);
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
    console.log(id);
    console.log(isCompleted);
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
      <ul className="m-auto w-1/4">
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
}

export default App;
