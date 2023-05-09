import { useEffect, useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import Shortcuts from "../Sections/Shortcuts";
import Todos from "../Sections/Todos";

const HomePage = () => {
  const { fetchTodos } = useContext(TodoContext);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <Shortcuts />
        <Todos />
      </div>
    </div>
  );
};

export default HomePage;
