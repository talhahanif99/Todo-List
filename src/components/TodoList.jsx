import { useEffect, useState } from "react";
import React from "react";

const getItems = () => {
  let get_Item = localStorage.getItem("Tasks");

  if (get_Item) {
    return JSON.parse(localStorage.getItem("Tasks"));
  } else {
    return [];
  }
};

const TodoList = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState(getItems());

  const submitHandler = (e) => {
    e.preventDefault();
    setmaintask([...maintask, { title, desc }]);
    settitle("");
    setdesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...maintask];
    copyTask.splice(i, 1);
    setmaintask(copyTask);
  };

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(maintask));
  }, [maintask]);

  let showTask = <h1>No Task Available</h1>;
  if (maintask.length > 0) {
    showTask = maintask.map((t, i) => {
      return (
        <li key={i} className="taskList">
          <div className="task-section-2">
            <h5 className="titleli">{t.title}</h5>
            <h6 className="titleli">{t.desc}</h6>
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <div className="main-container">
        <h1 className="heading">Todo List</h1>
        <hr />
        <h2 className="heading">Todos</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="task-input"
            placeholder="Enter Your Task"
            value={title}
            onChange={(elem) => {
              settitle(elem.target.value);
            }}
            required
          />
          <input
            type="text"
            className="task-input"
            placeholder="Task Description"
            value={desc}
            onChange={(elem) => {
              setdesc(elem.target.value);
            }}
          />
          <button className="add-button">Add</button>
        </form>
        <hr />
        <div className="task-section">
          <ul>{showTask}</ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
