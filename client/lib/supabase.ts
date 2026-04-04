import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────────────
export interface TrainingRegistration {
  id?: string;
  created_at?: string;
  first_name: string;
  last_name: string;
  email: string;
  building?: string;
  floor?: string;
  zone?: string;
  language: "fr" | "en";
  completed_modules?: number;
  total_modules?: number;
  average_score?: number;
  certificate_obtained?: boolean;
  completed_at?: string | null;
  session_id: string;
}

// ── Create or get session ID (stable per browser session) ────
export function getSessionId(): string {
  let id = localStorage.getItem("ibm_session_id");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("ibm_session_id", id);
  }
  return id;
}

// ── Save registration ─────────────────────────────────────────
export async function saveRegistration(data: Omit<TrainingRegistration, "id" | "created_at">) {
  const { error } = await supabase
    .from("training_registrations")
    .upsert(data, { onConflict: "session_id" });
  if (error) console.error("Supabase insert error:", error);
  return { error };
}

// ── Update progression ────────────────────────────────────────
export async function updateProgression(sessionId: string, updates: {
  completed_modules?: number;
  average_score?: number;
  certificate_obtained?: boolean;
  completed_at?: string;
}) {
  const { error } = await supabase
    .from("training_registrations")
    .update(updates)
    .eq("session_id", sessionId);
  if (error) console.error("Supabase update error:", error);
  return { error };
}

// ── Fetch all registrations (admin) ──────────────────────────
export async function fetchAllRegistrations(): Promise<TrainingRegistration[]> {
  const { data, error } = await supabase
    .from("training_registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("Supabase fetch error:", error); return []; }
  return (data ?? []) as TrainingRegistration[];
}
