"use client";
import { useAppStore, SettingsState } from "@/lib/store";

export default function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const profile = useAppStore((s) => s.profile);
  const setSettings = useAppStore((s) => s.setSettings);
  const setProfile = useAppStore((s) => s.setProfile);

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h1 className="text-xl font-semibold">Settings & Profile</h1>
      </div>

      <div className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-[--color-muted] mb-1">Language</div>
          <select value={settings.language} onChange={(e)=>setSettings({ language: e.target.value as SettingsState["language"] })} className="w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <div>
          <div className="text-sm text-[--color-muted] mb-1">Theme</div>
          <select value={settings.theme} onChange={(e)=>setSettings({ theme: e.target.value as SettingsState["theme"] })} className="w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <div className="text-sm text-[--color-muted] mb-1">Notifications</div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.notifications} onChange={(e)=>setSettings({ notifications: e.target.checked })} />
            Enable notifications
          </label>
        </div>
      </div>

      <div className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-[--color-muted] mb-1">Name</div>
          <input value={profile.name} onChange={(e)=>setProfile({ name: e.target.value })} className="w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent" />
        </div>
        <div>
          <div className="text-sm text-[--color-muted] mb-1">Budget</div>
          <input type="number" value={profile.budget} onChange={(e)=>setProfile({ budget: parseInt(e.target.value || "0") })} className="w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent" />
        </div>
      </div>
    </div>
  );
}