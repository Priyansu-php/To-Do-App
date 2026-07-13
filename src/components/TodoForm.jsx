import React from 'react'
import { useState } from "react";
import {FaPlus} from 'react-icons/fa'
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState("");

    const { addTodo } = useTodo();
    const add = (e) => {
        e.preventDefault();
        if (!todo) return
        addTodo({todo, completed: false });
        setTodo("");
    };
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
               className="w-full rounded-xl bg-slate-800 px-4 py-3 outline-none border border-slate-700 focus:border-blue-500"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
           <button
  type="submit"
  className="rounded-xl bg-blue-600 hover:bg-blue-700 transition px-5 py-3 font-semibold flex items-center gap-2"
>
  <FaPlus />
  Add 
</button>
        </form>
    );
}

export default TodoForm;

