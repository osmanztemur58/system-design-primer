"use client";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { MapPinned, Route, CalendarPlus } from "lucide-react";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function MapPage() {
  const pins = useAppStore((s) => s.pins);
  const addTask = useAppStore((s) => s.addTask);

  function planMyDay() {
    pins.slice(0, 3).forEach((p) => addTask({ title: `Visit ${p.name}`, category: "Travel" }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MapView pins={pins} />
      </div>
      <aside className="card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <MapPinned className="h-5 w-5" />
          <h2 className="font-semibold">AI Recommendations</h2>
        </div>
        <ul className="text-sm space-y-2">
          {pins.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-[--color-muted]">{p.type}</div>
              </div>
              <button className="btn btn-outline" onClick={() => addTask({ title: `Go to ${p.name}`, category: p.type === "Gym" ? "Health" : "Travel" })}>Add</button>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary w-full" onClick={planMyDay}>
          <CalendarPlus className="h-4 w-4 mr-1" /> Plan My Day
        </button>
        <div className="text-xs text-[--color-muted] flex items-center gap-1">
          <Route className="h-4 w-4" /> Suggested route optimizes distance and categories.
        </div>
      </aside>
    </div>
  );
}