import { Todo } from "@/models/todos";

const BACKEND_URL = "http://localhost:4000";


export const createTodo = async (userId: number, createTodo: Todo) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createTodo),
    });

    if (!response.ok) {
      throw new Error('Error creating todo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};


export const findAll = async (userId: number) => {

  try {
    const response = await fetch(`${BACKEND_URL}/todo/findAll/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error fetching todos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }


}

export const findAllTodosByUserIdCompleted = async (userId: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/findAllCompleted/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error fetching completed todos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching completed todos:', error);
    throw error;
  }
};

export const findAllTodosByUserIdNotCompleted = async (userId: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/findAllNotCompleted/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error fetching not completed todos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching not completed todos:', error);
    throw error;
  }
};

export const findOneTodo = async (id: number, idtodo: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/finonetodo/${id}/${idtodo}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Error fetching todo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};
export const updateTodo = async (userId: number, todoId: number, updateTodoDto: Todo) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/${userId}/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateTodoDto),
    });

    if (!response.ok) {
      throw new Error('Error updating todo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
export const removeTodo = async (userId: number, todoId: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/todo/${userId}/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting todo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};