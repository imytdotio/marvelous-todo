import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Link } from "react-router-dom";

interface ProjectLinkProps {
  project: string;
  count: number;
}

interface ProjectCount {
  project: string;
  count: number;
}

const ProjectLink = ({ project, count }: ProjectLinkProps) => {
  return (
    <Link
      to={`/projects/${project}`}
      className="border-zinc-700 border-2 
      duration-200 rounded-md px-4 text-lg flex flex-row justify-center py-2 h-20"
    >
      <div className="flex-1 my-auto">
        <span className="font-bold">{project}: </span>
        {count}
      </div>
      <div className="flex flex-col items-center my-auto">
        <p className="text-xs text-zinc-400">Next due date:</p>
        <p>09 May</p>
      </div>
    </Link>
  );
};

function ProjectsPage() {
  const { todos, fetchTodos } = useContext(TodoContext);
  const [projectCounts, setProjectCounts] = useState<ProjectCount[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const counts: Record<string, number> = {};

    todos.forEach((todo) => {
      if (!counts[todo.project]) {
        counts[todo.project] = 1;
      } else {
        counts[todo.project]++;
      }
    });

    const countsArray = Object.entries(counts).map(([project, count]) => ({
      project: project,
      count: count,
    }));
    setProjectCounts(countsArray);
  }, [todos]);

  return (
    <div>
      <h1 className="text-2xl mb-2">Projects Count</h1>
      <div className="flex flex-col gap-2">
        {projectCounts.map((countObj) => (
          <ProjectLink
            project={countObj.project}
            count={countObj.count}
            key={countObj.project}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
