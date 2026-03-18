import { useState } from "react";
import { createTask } from "../api/tasks";

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "", description: "", status: "todo", priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const { data } = await createTask(form);
      onTaskCreated(data);
      setForm({ title: "", description: "", status: "todo", priority: "medium" });
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      className="rounded-2xl p-6 mb-8">

      <h2 style={{ fontFamily: "Syne", color: "var(--accent-light)" }}
        className="text-lg font-bold mb-4 tracking-wide">
        + Νέα Task
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text" name="title"
          placeholder="Τι πρέπει να γίνει;"
          value={form.title} onChange={handleChange}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)"
          }}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600"
        />

        <textarea
          name="description"
          placeholder="Περιγραφή (προαιρετικό)..."
          value={form.description} onChange={handleChange} rows={2}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)"
          }}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600 resize-none"
        />

        <div className="flex gap-3">
          {[
            {
              name: "status",
              options: [
                { value: "todo", label: "📋 Todo" },
                { value: "in-progress", label: "🔄 In Progress" },
                { value: "done", label: "✅ Done" },
              ],
            },
            {
              name: "priority",
              options: [
                { value: "low", label: "🟢 Low" },
                { value: "medium", label: "🟡 Medium" },
                { value: "high", label: "🔴 High" },
              ],
            },
          ].map(({ name, options }) => (
            <select key={name} name={name} value={form[name]} onChange={handleChange}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)"
              }}
              className="flex-1 rounded-xl px-3 py-3 text-sm outline-none focus:border-violet-500 transition-all cursor-pointer">
              {options.map((o) => (
                <option key={o.value} value={o.value}
                  style={{ background: "#13131f" }}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}

          <button type="submit" disabled={loading}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              fontFamily: "Syne"
            }}
            className="px-6 py-3 rounded-xl text-white font-bold text-sm
                       hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                       transition-all disabled:opacity-50">
            {loading ? "..." : "Προσθήκη"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;