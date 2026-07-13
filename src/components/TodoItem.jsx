import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';
import {
    FaTrash, FaEdit, FaSave, FaCheck
} from 'react-icons/fa'

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    }
    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };


  return (
      <div
          className={`border
border-slate-700
rounded-2xl
bg-slate-800/70
backdrop-blur-md
px-5
py-4
flex
items-center
gap-4
transition-all
duration-300
hover:scale-[1.02]
hover:border-blue-500 ${
              todo.completed ? "opacity-70" : "bg-slate-800/70"
          }`}
      >
          <input
              type="checkbox"
              lassName="cursor-pointer h-5 w-5 accent-green-500"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`
                flex-1
                bg-transparent
                outline-none
                text-lg
                transition-all
                duration-200
                rounded-lg
                ${
                    isTodoEditable
                        ? "border border-blue-500 px-2 py-1 bg-slate-700/50"
                        : "border border-transparent"
                }
                ${
                    todo.completed
                        ? "line-through text-slate-400"
                        : "text-white"
                }
            `}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="h-10 w-10 rounded-lg hover:bg-yellow-400 transition flex items-center justify-center"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? <FaSave/> : <FaEdit />}
          </button>
          {/* Delete Todo Button */}
          <button
    onClick={() => deleteTodo(todo.id)}
    className="h-10 w-10 rounded-lg hover:bg-red-400 transition flex items-center justify-center"
>
    <FaTrash />
</button>
      </div>
  );
}

export default TodoItem;

