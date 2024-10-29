import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { removeTodo, updateTodo } from "@/apis/todos.api";

interface TaskCardProps {
  iduser: any;
  id: number;
  title: string;
  description: string;
  dateend: string;
  state: "pendiente" | "en progreso" | "completada";
  deleteTask: (id: number) => void;
}

const Card = (props: TaskCardProps) => {
  const { id, title, description, dateend, state, deleteTask, iduser } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configura useForm para el modal de edición
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      state: state,
    },
  });

  useEffect(() => {
    // Prellenar los valores del formulario cuando se abra el modal
    setValue("title", title);
    setValue("description", description);
    setValue("state", state);
  }, [title, description, state, setValue]);

  const handleDelete = async () => {
    try {
      await removeTodo(iduser, id);
      deleteTask(id);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); 
  };
  const formatDate = (dateString: string): string => {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // Los meses en JS van de 0 a 11
    const day = parseInt(dateString.slice(6, 8), 10);
    const date = new Date(year, month, day);
    return date.toLocaleDateString(); // Ajusta el formato según la configuración regional
  };
  const onSubmit = async (data: any) => {
    const formattedData = { ...data };
    try {
      await updateTodo(iduser, id, formattedData);
      setIsModalOpen(false); 
      deleteTask(id);

    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div className="p-2 w-full md:w-1/3 lg:w-1/4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 animate__animated animate__fadeInUp">
        {/* Encabezado de la tarjeta */}
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold">
            {id}. {title}
          </h5>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              state === "completada"
                ? "bg-green-500"
                : state === "en progreso"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {state}
          </span>
        </div>

        {/* Cuerpo de la tarjeta */}
        <div className="mb-4">
          <p className="text-sm">{description}</p>
          <hr className="my-2 border-gray-600" />
          <p className="text-sm">
            <strong>Fecha de finalización:</strong> {formatDate(dateend)}
          </p>
        </div>

        {/* Pie de la tarjeta */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-white">
            <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2 text-slate-300 text-sm">
                Título:
                <input
                  type="text"
                  {...register("title", {
                    required: "El título es obligatorio",
                  })}
                  className="w-full p-3 rounded bg-gray-700 text-slate-300 mt-1"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </label>

              <label className="block mb-2 text-slate-300 text-sm">
                Descripción:
                <textarea
                  {...register("description", {
                    required: "La descripción es obligatoria",
                  })}
                  className="w-full p-3 rounded bg-gray-700 text-slate-300 mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </label>

              {/* Select para cambiar el estado */}
              <label className="block mb-2 text-slate-300 text-sm">
                Estado:
                <select
                  {...register("state", {
                    required: "El estado es obligatorio",
                  })}
                  className="w-full p-3 rounded bg-gray-700 text-slate-300 mt-1"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En progreso</option>
                  <option value="completada">Completada</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state.message}</p>
                )}
              </label>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
