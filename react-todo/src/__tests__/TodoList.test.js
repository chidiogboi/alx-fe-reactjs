import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Verify initial todos are rendered
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-item-Learn React')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-Build Todo App')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-Write Tests')).toBeInTheDocument();
  });

  // Test 2: Verify adding a new todo
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByTestId('todo-item-Test Todo')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Verify input is cleared
  });

  // Test 3: Verify toggling a todo's completion status
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    const todoItem = screen.getByTestId('todo-item-Learn React');

    expect(todoItem).not.toHaveClass('line-through');
    fireEvent.click(todoItem);
    expect(todoItem).toHaveClass('line-through');
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveClass('line-through');
  });

  // Test 4: Verify deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId('delete-button-Learn React');

    fireEvent.click(deleteButton);
    expect(screen.queryByTestId('todo-item-Learn React')).not.toBeInTheDocument();
  });

  // Test 5: Verify form does not add empty todo
  test('does not add empty todo when form is submitted', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);

    expect(screen.queryByTestId('todo-item-')).not.toBeInTheDocument();
  });
});