import "./App.css";
import { useState } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => 
        t.id === editTodo.id
        ? (t = {id: t.id, todo})
        : {id: t.id, todo: t.todo}
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if(todo !== "") {
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      setTodo("")
    }
  }

  const handleDelete = (key) => {
    const delTodo = todos.filter((to)=> to.id !== key);
    setTodos([...delTodo]);
  }

  const handleEdit = (key) => {
    const editTodo = todos.find((t)=>t.id === key);
    setTodo(editTodo.todo);
    setEditId(key);
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Todo List App</h1>
          
            <TodoForm 
              handleSubmit={handleSubmit}
              todo={todo}
              setTodo={setTodo}
              editId={editId} />

            <TodoList
              todos={todos}
              handleEdit={handleEdit}
              handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
