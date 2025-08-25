"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { CalendarCheck2, Plus, Sparkles, MapPin } from "lucide-react";

export default function Home() {
  const userName = useAppStore((s) => s.profile.name);
  const tasks = useAppStore((s) => s.tasks);
  const completeTask = useAppStore((s) => s.completeTask);
  const addTask = useAppStore((s) => s.addTask);

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <section className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Good day, {userName || "there"} 👋</h1>
          <p className="text-sm text-[--color-muted] mt-1">Here is your plan for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Link href="/onboarding" className="btn btn-outline">Onboarding</Link>
          <Link href="/settings" className="btn btn-outline">Settings</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Today’s Plan</h2>
            <div className="text-sm text-[--color-muted]">{progress}%</div>
          </div>
          <div className="w-full h-2 bg-[--color-brand-50] rounded-full overflow-hidden">
            <div className="h-full bg-[--color-brand]" style={{ width: `${progress}%` }} />
          </div>
          <ul className="mt-4 space-y-2">
            {tasks.slice(0, 5).map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2 px-3 rounded-lg border border-[--color-border]">
                <div className="flex items-center gap-3">
                  <CalendarCheck2 className="h-4 w-4 text-[--color-muted]" />
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-[--color-muted]">{t.category}</div>
                  </div>
                </div>
                {t.status !== "completed" ? (
                  <button className="btn btn-primary" onClick={() => completeTask(t.id)}>Mark done</button>
                ) : (
                  <span className="badge">Completed</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="btn btn-outline" onClick={() => addTask({ title: "New Task", category: "Work" })}>
                <Plus className="h-4 w-4" />
                Add Task
              </button>
              <button className="btn btn-outline" onClick={() => addTask({ title: "AI Suggestion: 10-min stretch", category: "Health" })}>
                <Sparkles className="h-4 w-4" />
                AI Suggest
              </button>
              <Link className="btn btn-outline" href="/map">
                <MapPin className="h-4 w-4" />
                Map
              </Link>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Goals</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <GoalCard title="Health" count={tasks.filter((t)=>t.category==="Health").length} />
              <GoalCard title="Study" count={tasks.filter((t)=>t.category==="Study").length} />
              <GoalCard title="Work" count={tasks.filter((t)=>t.category==="Work").length} />
              <GoalCard title="Travel" count={tasks.filter((t)=>t.category==="Travel").length} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GoalCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="p-4 rounded-lg border border-[--color-border]">
      <div className="text-xs text-[--color-muted] mb-1">{title}</div>
      <div className="text-2xl font-semibold">{count}</div>
    </div>
  );
}