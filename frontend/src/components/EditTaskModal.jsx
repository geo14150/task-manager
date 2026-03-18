import { useState } from "react";
import { updateTask } from "../api/tasks";

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: task.title, description: task.description,
    status: task.status, priority: task.priority,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const { data } = await updateTask(task._id, form);
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)"
      }} className="rounded-2xl p-7 w-full max-w-md fade-up">

        <h2 style={{ fontFamily: "Syne", color: "var(--accent-light)" }}
          className="text-xl font-bold mb-5">
          ✏️ Επεξεργασία Task
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="title" value={form.title} onChange={handleChange}
            placeholder="Τίτλος..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)"
            }}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600"
          />

          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Περιγραφή..." rows={3}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)"
            }}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600 resize-none"
          />

          <div className="flex gap-3">
            {[
              { name: "status",   opts: [["todo","📋 Todo"],["in-progress","🔄 In Progress"],["done","✅ Done"]] },
              { name: "priority", opts: [["low","🟢 Low"],["medium","🟡 Medium"],["high","🔴 High"]] },
            ].map(({ name, opts }) => (
              <select key={name} name={name} value={form[name]} onChange={handleChange}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)"
                }}
                className="flex-1 rounded-xl px-3 py-3 text-sm outline-none cursor-pointer">
                {opts.map(([val, lbl]) => (
                  <option key={val} value={val} style={{ background: "#13131f" }}>{lbl}</option>
                ))}
              </select>
            ))}
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
                fontFamily: "Syne"
              }}
              className="flex-1 py-3 rounded-xl font-bold text-sm hover:opacity-80 transition-all">
              Ακύρωση
            </button>
            <button type="submit"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                fontFamily: "Syne"
              }}
              className="flex-1 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all">
              Αποθήκευση ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;