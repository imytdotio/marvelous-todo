interface TodoProps {
  title: string;
  description?: string;
  project: string;
  dueDate: string;
  id: string;
  completed: boolean;
}

const Todo = ({
  title,
  description,
  project,
  dueDate,
  id,
  completed,
}: TodoProps) => {
  return (
    <div
      id={id}
      className="border-2 border-zinc-700 rounded-md flex flex-col gap-2 p-4"
    >
      <div className="flex flex-row justify-between">
        <p className="border border-zinc-500 rounded-full px-4 cursor-pointer">
          {project}
        </p>
        {dueDate}
      </div>

      <h1 className="text-2xl pl-4">{title}</h1>
      <p>{description}</p>
      <p>{completed}</p>
    </div>
  );
};

export default Todo;
