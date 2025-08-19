import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded"
          data-testid="todo-input"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          data-testid="add-button"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;