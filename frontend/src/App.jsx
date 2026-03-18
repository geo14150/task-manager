import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { fetchTasks } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    search: "", status: "all", priority: "all",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchSearch =
      filters.search === "" ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus   = filters.status   === "all" || task.status   === filters.status;
    const matchPriority = filters.priority === "all" || task.priority === filters.priority;
    return matchSearch && matchStatus && matchPriority;
  }), [tasks, filters]);

  const handleTaskCreated = (t) => { setTasks([t, ...tasks]); setShowForm(false); };
  const handleDelete = (id) => setTasks(tasks.filter((t) => t._id !== id));
  const handleUpdate = (u)  => setTasks(tasks.map((t) => (t._id === u._id ? u : t)));

  const done       = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo       = tasks.filter((t) => t.status === "todo").length;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* Background orbs */}
      <div className="fixed top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent)" }} />
      <div className="fixed bottom-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07), transparent)" }} />

      {/* Centered container με max-width και padding */}
      <div className="max-w-6xl mx-auto px-8 py-8 relative z-10">

        {/* ── Navbar ── */}
        <div className="flex justify-between items-center mb-8 fade-up">
          <div>
            <h1 style={{ fontFamily: "Syne", color: "var(--accent-light)" }}
              className="text-2xl font-extrabold tracking-tight">
              ✦ TaskFlow
            </h1>
            <p style={{ color: "var(--text-secondary)" }} className="text-xs mt-0.5">
              Γεια σου,{" "}
              <span style={{ color: "var(--text-primary)" }} className="font-semibold">
                {user?.name}
              </span> 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Task button */}
            <button onClick={() => setShowForm((v) => !v)}
              style={{
                background: showForm
                  ? "rgba(124,58,237,0.2)"
                  : "linear-gradient(135deg, #7c3aed, #06b6d4)",
                fontFamily: "Syne",
                border: showForm ? "1px solid rgba(124,58,237,0.4)" : "none",
                color: showForm ? "#a78bfa" : "white",
              }}
              className="px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
              {showForm ? "✕ Κλείσιμο" : "+ Νέα Task"}
            </button>

            <button onClick={logout}
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171", fontFamily: "Syne",
              }}
              className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-all">
              Αποσύνδεση
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-6 stagger">
          {[
            { label: "Εκκρεμή",       value: todo,       color: "#94a3b8", bg: "rgba(148,163,184,0.08)" },
            { label: "Σε εξέλιξη",    value: inProgress, color: "#a78bfa", bg: "rgba(124,58,237,0.08)"  },
            { label: "Ολοκληρωμένα",  value: done,       color: "#4ade80", bg: "rgba(34,197,94,0.08)"   },
          ].map(({ label, value, color, bg }) => (
            <div key={label}
              style={{ background: bg, border: "1px solid var(--border)" }}
              className="rounded-2xl px-5 py-4 flex items-center gap-4">
              <span style={{ color, fontFamily: "Syne" }} className="text-3xl font-extrabold">
                {value}
              </span>
              <span style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── New Task Form (collapsible) ── */}
        {showForm && (
          <div className="mb-6 fade-up">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        )}

        {/* ── Filters ── */}
        <TaskFilters
          filters={filters}
          onChange={setFilters}
          totalTasks={filteredTasks.length}
        />

        {/* ── Kanban Board ── */}
        {loading ? (
          <div className="text-center py-24">
            <div className="float inline-block text-4xl">✦</div>
            <p style={{ color: "var(--text-secondary)" }} className="mt-4 text-sm">
              Φόρτωση tasks...
            </p>
          </div>
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;