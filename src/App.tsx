import "./App.css";
import { useEffect, useState } from "react";
import {
  TodoContext,
  TodoType,
  fetchTodos as fetchTodosFunction,
} from "./Context/TodoContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectPage from "./Pages/ProjectPage";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodos = async (eq?: string) => {
    await fetchTodosFunction(setTodos, eq);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="p-2 lg:w-1/3 md:w-2/3 w-full m-auto">
          <TodoContext.Provider value={{ todos, setTodos, fetchTodos }}>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:project" element={<ProjectPage />} />
            </Routes>
          </TodoContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
