import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getTodo = () => {
    axios
      .get("/api/todos")
      .then((response) => {
        // console.log(response);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = () => {
    axios
      .post("/api/todos", {
        task: newTodo,
        completed: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const completeTodo = (data) => {
    // console.log(data)
    axios
      .put(`/api/todos/${data._id}`, {
        completed: !data.completed,
      })
      .then((response) => {
        // console.log(response)
        getTodo()
        // const updatedTodos = todos.map((todo) => {
        //   if (todo.id === id) {
        //     todo.completed = true;
        //   }
        //   return todo;
        // });
        // setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Todo</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<TodoList todos={todos} completeTodo={completeTodo} />}
          />
          <Route
            path="/add"
            element={
              <AddTodo
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                addTodo={addTodo}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function TodoList({ todos, completeTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo._id} className="todo">
          <div
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={() => completeTodo(todo
              )}
          >
            {todo.task}
          </div>
          <div className="todo-completed">
            {todo.completed ? "Completed" : "Incomplete"}
          </div>
        </div>
      ))}
    </div>
  );
}

function AddTodo({ newTodo, setNewTodo, addTodo }) {
  return (
    <div className="add-todo">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default App;





// import './App.css';
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import axios from "axios";

// function App() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get("/api/todos");
//       setTodos(response.data);
//     }

//     fetchData();
//   }, []);

//   async function addTodo() {
//     const newTodo = {
//       title: "New Todo",
//       completed: false
//     };

//     const response = await axios.post("/api/todos", newTodo);
//     setTodos([...todos, response.data]);
//   }

//   return (
//     <BrowserRouter>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/todos">Todos</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/todos" element={<Todos todos={todos} addTodo={addTodo} />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// function Home() {
//   return <h2>Welcome to the home page</h2>;
// }

// function Todos({ todos, addTodo }) {
//   return (
//     <div>
//       <h2>Todos</h2>
//       <button onClick={addTodo}>Add Todo</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo.id}>
//             {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;