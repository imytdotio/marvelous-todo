import Todo from "../Components/Todo";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { PostgrestResponse } from "@supabase/supabase-js";

interface Todo {
  title: string;
  description?: string;
  project: string;
  dueDate: string;
  id: string;
  completed: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchTodos = async () => {
    const { data, error }: PostgrestResponse<{ [x: string]: any }[]> =
      await supabase.from("Todo").select("*");

    if (data) {
      const todos: Todo[] = data.map((item: { [x: string]: any }) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
        project: item.project,
        dueDate: item.dueDate,
        description: item.description,
      }));

      setTodos(todos);
      setLoading(false);
    }

    console.log(error);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {loading && <p className="m-auto animate-pulse">Loading...</p>}
      {todos.map((todo: Todo) => (
        <Todo {...todo} />
      ))}
      {/* <Todo
        title="Machine Learning Project"
        project="AtomicProjects.xyz"
        dueDate="09 May"
        id="1"
        completed={false}
      />
      <Todo
        title="Machine Learning Project"
        project="AtomicProjects.xyz"
        dueDate="09 May"
        id="2"
        completed={false}
      /> */}
    </>
  );
};
export default Todos;
