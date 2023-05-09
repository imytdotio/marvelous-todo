import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import Todos from "../Sections/Todos";
import { BsArrowLeft } from "react-icons/bs";

const ProjectPage = () => {
  const { project } = useParams<{ project: string }>();
  const { fetchTodos } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos(project);
  }, [project]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center">
        <button onClick={() => navigate(-1)} className="text-2xl">
          <BsArrowLeft className="" />
        </button>
        <h1 className="text-2xl ">Project: {project}</h1>
      </div>

      <Todos />
    </div>
  );
};

export default ProjectPage;
