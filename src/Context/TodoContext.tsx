import { createContext } from "react";
import { supabase } from "../config/supabaseClient";
import { PostgrestResponse } from "@supabase/supabase-js";

export interface TodoType {
  title: string;
  description?: string;
  project: string;
  dueDate: string;
  id: string;
  completed: boolean;
}

interface TodoContextData {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  fetchTodos: (eq?: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextData>({
  todos: [],
  setTodos: () => {},
  fetchTodos: async () => {},
});

export const fetchTodos = async (
  setTodos: (todos: TodoType[]) => void,
  eq?: string
) => {
  const query = supabase.from("Todo").select("*");

  if (eq) {
    query.eq("project", eq);
  }

  const { data, error }: PostgrestResponse<any> = await query;

  if (data) {
    const todos: TodoType[] = data.map((item: { [x: string]: any }) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
      project: item.project,
      dueDate: item.dueDate,
      description: item.description,
    }));

    setTodos(todos);
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
};
