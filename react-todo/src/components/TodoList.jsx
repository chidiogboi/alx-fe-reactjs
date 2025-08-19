import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul className="max-w-md mx-auto">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-item-${todo.text}`}
            className={`flex justify-between items-center p-2 mb-2 bg-white rounded shadow ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <span>{todo.text}</span>
            <button
              data-testid={`delete-button-${todo.text}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;