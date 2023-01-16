import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../Config/supabaseClient";

/**
 * @author
 * @function Todo
 **/

const Input = (props) => {
  return (
    <div className="flex-col text-left inline-block mb-4">
      <p className="text-sm text-gray-400 mb-1">{props.placeholder}</p>
      {props.children}
    </div>
  );
};

export const Todo = (props) => {
  const { id } = useParams();
  // const id = 1;

  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const fetchTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      setError(error);
      console.log(error);
      return;
    }

    if (data) {
      setError(null);
      setTodo(data);
      setTitle(data.title);
      setNote(data.note);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const navigate = useNavigate();

  const updateTodo = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("todos")
      .update({ title: title, note: note })
      .eq("id", id)
      .select();

    if (data) {
      console.log(data);
      navigate("/");
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      {todo && (
        <form className="m-auto" onSubmit={updateTodo}>
          <Input placeholder="title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Input>
          <br />
          <Input placeholder="note">
            <input value={note} onChange={(e) => setNote(e.target.value)} />
          </Input>
          <br />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md m-2"
          >
            Edit
          </button>
        </form>
      )}
    </div>
  );
};
