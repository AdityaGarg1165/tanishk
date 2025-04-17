'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TodoList({ themeColor }) {
  const router = useRouter();
  const [tasks, setTasks] = useState([
    { text: 'Task 1', completed: true },
    { text: 'Task 2', completed: false },
  ]);

  const addTask = (text) => {
    if (text.trim()) setTasks([...tasks, { text, completed: false }]);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div
      className="w-screen h-screen p-5 flex flex-col gap-4"
      style={{
        backgroundColor: '#ececcf',
        fontFamily: 'Toon Around',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-black text-lg font-bold w-fit px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition"
        style={{ fontFamily: 'Toon Around' }}
      >
        ← Back
      </button>

      <h1 className="text-center text-3xl font-bold tracking-wider">TO-DO</h1>

      {tasks.map((task, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(i)}
              className="appearance-none w-5 h-5 border-2 border-black rounded-sm bg-white checked:bg-black"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                position: 'relative',
              }}
            />
            <span
              className="absolute left-[3px] top-[-4px] text-white text-lg font-bold pointer-events-none"
              style={{ display: task.completed ? 'block' : 'none' }}
            >
              ✓
            </span>
          </div>
          <span
            className="text-xl"
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.5 : 1,
            }}
          >
            {task.text}
          </span>
        </div>
      ))}

      <input
        className="mt-2 border-2 border-black rounded p-2 text-base"
        placeholder="Add Task..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(e.target.value);
            e.target.value = '';
          }
        }}
        style={{ fontFamily: 'Toon Around' }}
      />

      {/* Fill empty slots for aesthetic spacing */}
      {Array.from({ length: Math.max(0, 7 - tasks.length) }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-black rounded-sm"></div>
        </div>
      ))}
    </div>
  );
}
