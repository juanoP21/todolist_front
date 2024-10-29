import { createTodo } from "@/apis/todos.api";
import React from "react";
import { useForm } from "react-hook-form";

interface TaskData {
  id: number;
  title: string;
  description: string;
  dateend: string;
  state: "pendiente" | "en progreso" | "completada";
  deleteTask: (id: number) => void;
}

const CreateToDo = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>();

  const onSubmit = handleSubmit(async (data) => {
    const formattedDate = data.dateend.replace(/-/g, ""); // Formatear la fecha a 'yyyymmdd'
    const formattedData = { ...data, dateend: formattedDate };

    try {
      const response = await createTodo(props.idUser, formattedData);
      // Verificar si la respuesta es OK
      if (response.status === 201) {
        // Asegúrate de que tu API devuelve un status 200 al crear exitosamente
        alert("Ocurrió un error al crear la tarea");
      } else {
        alert("Tarea creada satisfactoriamente");
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Ocurrió un error en la solicitud");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-white font-bold text-2xl mb-4">Nueva Tarea</h1>

        <label htmlFor="title" className="text-slate-300 mb-2 block text-sm">
          Título:
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "El título es obligatorio" })}
          className="p-3 rounded block mb-2 w-full text-slate-300 bg-gray-700"
          placeholder="Escribe el título"
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}

        <label
          htmlFor="description"
          className="text-slate-300 mb-2 block text-sm"
        >
          Descripción:
        </label>
        <input
          type="text"
          id="description"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
          className="p-3 rounded block mb-2 w-full text-slate-300 bg-gray-700"
          placeholder="Escribe la descripción"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}

        <label htmlFor="dateend" className="text-slate-300 mb-2 block text-sm">
          Fecha de finalización:
        </label>
        <input
          type="date"
          id="dateend"
          {...register("dateend", {
            required: "La fecha de finalización es obligatoria",
          })}
          className="p-3 rounded block mb-2 w-full text-slate-300 bg-gray-700"
        />
        {errors.dateend && (
          <p className="text-red-500 text-xs">{errors.dateend.message}</p>
        )}

        <label htmlFor="state" className="text-slate-300 mb-2 block text-sm">
          Estado:
        </label>
        <select
          id="state"
          {...register("state", { required: "El estado es obligatorio" })}
          className="p-3 rounded block mb-2 w-full text-slate-300 bg-gray-700"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        {errors.state && (
          <p className="text-red-500 text-xs">{errors.state.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded mt-4 w-full"
        >
          Crear Tarea
        </button>
      </form>
    </div>
  );
};

export default CreateToDo;
