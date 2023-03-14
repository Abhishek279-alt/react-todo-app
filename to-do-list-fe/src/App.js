import { useState, useEffect } from "react";
import "./App.css";
import ListItem from "./components/ListItem";

function App() {
  const [inputData, setInputData] = useState("");
  const [listArray, setListArray] = useState([]);
  const submitToDo = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputData }),
      }).then((res) => res.json);
    } catch (error) {
      console.log(error);
    }
    fetchToDo();
  };

  const fetchToDo = async () => {
    let fetchedData = await fetch("http://localhost:4000/gettodo");
    let response = await fetchedData.json();
    setListArray(response);
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  return (
    <div className="container">
      <div className="title text-center fw-bold my-5">To Do List App</div>
      <div className="row my-2">
        <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
          <div className="toDoInput">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Enter To-Do
              </span>
              <input
                type="text"
                className="form-control"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-warning"
                onClick={submitToDo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-12 d-flex flex-column mx-auto">
          {listArray.map((listItem) => {
            return (
              <ListItem
                key={listItem.todo_id}
                todoId={listItem.todo_id}
                listValue={listItem.list}
                fetchToDo={fetchToDo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
