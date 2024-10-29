"use client";
import { findAll } from "@/apis/todos.api";
import Card from "@/Components/CardToDo/Card";
import CreateToDo from "@/Components/CreateToDo/CreateToDo";
import { Todo } from "@/models/todos";
import { getLoginInfo } from "@/utils/getinfousers";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";

const todo = () => {
  const [todos, setTodos] = useState([]);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const getAlldTodos = async () => {
    const userId = getLoginInfo()?.id;
    if (userId != null) {
      try {
        setIdUser(userId);
        const response = await findAll(userId);
        setTodos(response);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  };

  const toggleTaskModal = () => {
    setShowTaskModal(!showTaskModal);
  };

  const longout = () => {
    localStorage.clear();
    destroyCookie(null, "authToken", { path: "/" });
    window.location.href = "/login";
  };

  useEffect(() => {
    getAlldTodos();
  }, []);
  return (
    <div>
      <div className="ss">
        <nav className="flex">
          <h1 className="text-white text-2xl font-bold">ToDo App</h1>
          <button
            onClick={toggleTaskModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showTaskModal ? "Cerrar Tarea" : "Crear Tarea"}
          </button>

          <button
            onClick={longout}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex justify-center items-center my-1.5"
            style={{ marginInlineStart: "auto" }}
          >
            cerrar sesion
          </button>
        </nav>
      </div>
      {showTaskModal && (
        <CreateToDo idUser={idUser} deleteTask={getAlldTodos} />
      )}

      <div className="flex flex-wrap	">
        {todos.map((todo: Todo) => (
          <Card
            iduser={idUser}
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            dateend={todo.dateend}
            state={todo.state}
            deleteTask={getAlldTodos}
          />
        ))}
      </div>
      {/* <Card /> */}
    </div>
  );
};

export default todo;
