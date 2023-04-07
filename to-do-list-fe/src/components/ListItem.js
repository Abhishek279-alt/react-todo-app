import React, { useEffect } from "react";

const ListItem = (props) => {
  let listId = props.todoId;

  const deleteToDo = async () => {
    try {
      await fetch("http://localhost:4000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId }),
      }).then((res) => res.json);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    let updateValue = prompt("Edit to-do", "");
    if (updateTodo !== null) {
      try {
        await fetch(`http://localhost:4000/edit/${listId}/${updateValue}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    props.fetchToDo();
  });
  return (
    <>
      <div className="card my-2 list-node">
        <div className="card-body">
          <p className="card-text">{props.listValue}</p>
        </div>
        <button
          type="button"
          className="btn  btn-link btn-sm text-dark text-decoration-none fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
          onClick={updateTodo}
        >
          <i className="fa fa-pencil"></i>
        </button>
        <button
          type="button"
          className="btn btn-link btn-sm text-dark text-decoration-none fw-bold"
          onClick={deleteToDo}
        >
          X
        </button>
      </div>
    </>
  );
};

export default ListItem;
