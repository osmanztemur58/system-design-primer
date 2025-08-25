"use client";
import { useState } from "react";
import { useAppStore, TaskItem, TaskCategory } from "@/lib/store";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

export default function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const addTask = useAppStore((s) => s.addTask);
  const updateTask = useAppStore((s) => s.updateTask);
  const deleteTask = useAppStore((s) => s.deleteTask);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Work");

  function onAdd() {
    if (!title.trim()) return;
    addTask({ title, category });
    setTitle("");
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h1 className="text-xl font-semibold">Tasks & Goals</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" className="border border-[--color-border] rounded-lg px-3 py-2 bg-transparent" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-[--color-border] rounded-lg px-3 py-2 bg-transparent">
            <option>Work</option>
            <option>Health</option>
            <option>Study</option>
            <option>Travel</option>
          </select>
          <button className="btn btn-primary" onClick={onAdd}>Add</button>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="font-semibold mb-3">Your items</h2>
        <ul className="divide-y divide-[--color-border]">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TaskRow({ task, onUpdate, onDelete }: { task: TaskItem; onUpdate: (id: string, u: Partial<TaskItem>) => void; onDelete: (id: string)=>void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState<TaskCategory>(task.category);

  function toggleStatus() {
    onUpdate(task.id, { status: task.status === "completed" ? "pending" : "completed" });
  }

  function save() {
    onUpdate(task.id, { title, category });
    setEditing(false);
  }

  return (
    <li className="flex items-center gap-3 py-3">
      <button onClick={toggleStatus} aria-label="toggle status" className="text-[--color-muted]">
        {task.status === "completed" ? <CheckCircle2 className="h-5 w-5 text-[--color-brand]" /> : <Circle className="h-5 w-5" />}
      </button>
      {editing ? (
        <>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-[--color-border] rounded-lg px-2 py-1 bg-transparent" />
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-[--color-border] rounded-lg px-2 py-1 bg-transparent">
            <option>Work</option>
            <option>Health</option>
            <option>Study</option>
            <option>Travel</option>
          </select>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <div>
            <div className="font-medium">{task.title}</div>
            <div className="text-xs text-[--color-muted]">{task.category}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline" onClick={()=>setEditing(true)}>
              <Pencil className="h-4 w-4" />
              Edit
            </button>
            <button className="btn btn-outline" onClick={()=>onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}