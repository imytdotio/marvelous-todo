import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

/**
 * @author
 * @function Todo
 **/

export const Todo = (props) => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);
  return <div>Todo</div>;
};
