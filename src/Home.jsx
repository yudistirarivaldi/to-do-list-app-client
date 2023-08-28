import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((result) => setTodos(result.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3000/api/tasks/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/tasks/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1>To Do List</h1>
      <Create />
      <br />

      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo.id}>
            <div
              className="checkbox"
              onClick={() => {
                handleEdit(todo.id);
              }}
            >
              {todo.done ? 
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
               : 
                <BsCircleFill className="icon" />
              }
              
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo.id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Home;
