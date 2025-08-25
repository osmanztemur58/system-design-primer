"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Check, ChevronRight } from "lucide-react";

const interestsList = ["Work", "Health", "Study", "Travel"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);

  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile.name || "");
  const [interests, setInterests] = useState<string[]>(profile.interests || []);
  const [budget, setBudget] = useState<number>(profile.budget || 1000);
  const [workStyle, setWorkStyle] = useState<string>(profile.preferences.workStyle || "Focus blocks");
  const [travelPref, setTravelPref] = useState<string>(profile.preferences.travel || "Urban explorer");

  const totalSteps = 3;
  const progress = Math.round((step / totalSteps) * 100);

  function toggleInterest(i: string) {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  function next() {
    if (step < totalSteps) setStep(step + 1);
  }
  function back() {
    if (step > 1) setStep(step - 1);
  }

  function finish() {
    setProfile({ name, interests, budget, preferences: { workStyle, travel: travelPref } });
    router.push("/");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Welcome to Asistika</h1>
          <div className="text-sm text-[--color-muted]">{progress}%</div>
        </div>
        <div className="w-full h-2 bg-[--color-brand-50] rounded-full overflow-hidden">
          <div className="h-full bg-[--color-brand]" style={{ width: `${progress}%` }} />
        </div>
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-[--color-muted]">Your name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Alex" className="mt-1 w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent" />
            </div>
            <div>
              <div className="text-sm text-[--color-muted] mb-2">Select your interests</div>
              <div className="flex flex-wrap gap-2">
                {interestsList.map((i) => (
                  <button key={i} type="button" onClick={() => toggleInterest(i)} className={`badge ${interests.includes(i) ? "border-[--color-brand] text-[--color-brand]" : ""}`}>
                    {interests.includes(i) && <Check className="h-4 w-4" />} {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[--color-muted]">Monthly budget</label>
              <input type="range" min={100} max={5000} step={50} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value))} className="w-full" />
              <div className="text-sm mt-1">${budget}</div>
            </div>
            <div>
              <label className="text-sm text-[--color-muted]">Work style</label>
              <select value={workStyle} onChange={(e)=>setWorkStyle(e.target.value)} className="mt-1 w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent">
                <option>Focus blocks</option>
                <option>Meetings heavy</option>
                <option>Flexible</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[--color-muted]">Travel preference</label>
              <select value={travelPref} onChange={(e)=>setTravelPref(e.target.value)} className="mt-1 w-full border border-[--color-border] rounded-lg px-3 py-2 bg-transparent">
                <option>Urban explorer</option>
                <option>Nature & hikes</option>
                <option>Beach</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-3 text-sm">
            <div><span className="text-[--color-muted]">Name:</span> {name || "—"}</div>
            <div><span className="text-[--color-muted]">Interests:</span> {interests.join(", ") || "—"}</div>
            <div><span className="text-[--color-muted]">Budget:</span> ${budget}</div>
            <div><span className="text-[--color-muted]">Work style:</span> {workStyle}</div>
            <div><span className="text-[--color-muted]">Travel:</span> {travelPref}</div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button className="btn btn-outline" onClick={back} disabled={step===1}>Back</button>
          {step < totalSteps ? (
            <button className="btn btn-primary" onClick={next}>
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={finish}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}