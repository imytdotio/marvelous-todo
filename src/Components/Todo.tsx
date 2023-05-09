// import { useContext } from "react";
import { TodoType } from "../Context/TodoContext";
import { Link } from "react-router-dom";

const Todo = ({
  title,
  // description,
  project,
  dueDate,
  id,
  completed,
}: TodoType) => {
  // const { fetchTodos } = useContext(TodoContext);

  // const handleProjectClick = () => {
  //   fetchTodos(project);
  // };

  return (
    <Link
      to={`/todo/${id}`}
      id={id}
      className="border-2 border-zinc-700 rounded-md flex flex-col gap-2 p-4"
    >
      <div className="flex flex-row justify-between">
        <Link
          to={`/projects/${project}`}
          className="border border-zinc-500 rounded-full px-4 cursor-pointer"
        >
          {project}
        </Link>
        {dueDate}
      </div>

      <h1 className="text-2xl pl-4">{title}</h1>
      {/* <p>{description}</p> */}
      <p>{completed}</p>
    </Link>
  );
};

export default Todo;
