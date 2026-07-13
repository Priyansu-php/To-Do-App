import { useState,useEffect } from 'react'
import React from 'react'
import './App.css'
import { Todoprovider } from './contexts'
import { TodoContext } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
  setTodos((prev)=> [ {id: Date.now(), ...todo}, ...prev])}

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) 
  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}
  , [] )

  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

  return (
  <Todoprovider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-10 px-4">
  <div className="w-full max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-white">
  <h1 className="text-4xl font-extrabold text-center tracking-tight mb-2">
    TaskFlow
</h1>

<p className="text-center text-slate-300 mb-8">
    Organize your work. Stay productive.
</p>
                    <div className="mb-4"><div className="grid grid-cols-3 gap-4 mb-8">

<div className="rounded-xl bg-slate-800/50 p-4 text-center">
    <p className="text-slate-400">Total</p>
    <h2 className="text-2xl font-bold">{todos.length}</h2>
</div>

<div className="rounded-xl bg-slate-800/50 p-4 text-center">
    <p className="text-slate-400">Completed</p>
    <h2 className="text-2xl font-bold">
        {todos.filter(todo => todo.completed).length}
    </h2>
</div>

<div className="rounded-xl bg-slate-800/50 p-4 text-center">
    <p className="text-slate-400">Pending</p>
    <h2 className="text-2xl font-bold">
        {todos.filter(todo => !todo.completed).length}
    </h2>
</div>

</div>
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="space-y-4">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                    
                </div>
                <p className="mt-80 text-center text-slate-500 mt-8 text-sm">
Built by Priyansu using React & Tailwind CSS
</p>
            </div>
            
  </Todoprovider>
  
  )
}


export default App
