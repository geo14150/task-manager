import TaskCard from "./TaskCard";

const columns = [
  { key: "todo",        label: "📋 Todo",        color: "#94a3b8", glow: "rgba(148,163,184,0.15)" },
  { key: "in-progress", label: "🔄 In Progress",  color: "#a78bfa", glow: "rgba(124,58,237,0.15)"  },
  { key: "done",        label: "✅ Done",          color: "#4ade80", glow: "rgba(34,197,94,0.15)"   },
];

const KanbanBoard = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        return (
          <div key={col.key}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderTop: `3px solid ${col.color}`,
              minHeight: "400px",
            }}
            className="rounded-2xl p-4 flex flex-col gap-3">

            {/* Column header */}
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: "Syne", color: col.color }}
                className="font-bold text-sm tracking-wide">
                {col.label}
              </span>
              <span style={{
                background: col.glow,
                color: col.color,
                fontFamily: "Syne"
              }} className="text-xs font-bold px-2 py-0.5 rounded-full">
                {colTasks.length}
              </span>
            </div>

            {/* Cards */}
            {colTasks.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p style={{ color: "var(--text-secondary)" }}
                  className="text-xs text-center opacity-50">
                  Δεν υπάρχουν tasks
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 stagger">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;