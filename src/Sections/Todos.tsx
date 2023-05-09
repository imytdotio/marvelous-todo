import Todo from "../Components/Todo";
import { useContext } from "react";
import { TodoContext, TodoType } from "../Context/TodoContext";

// interface TodoType {
//   title: string;
//   description?: string;
//   project: string;
//   dueDate: string;
//   id: string;
//   completed: boolean;
// }

const Todos = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos ? (
        todos.map((todo: TodoType) => <Todo {...todo} key={todo.id} />)
      ) : (
        <p className="m-auto animate-pulse">Loading...</p>
      )}
    </>
  );
};
export default Todos;
