import { useState } from "react";
import { deleteTask, updateTask } from "../api/tasks";
import EditTaskModal from "./EditTaskModal";

const priorityConfig = {
  low:    { label: "Low",    dot: "#22c55e", bg: "rgba(34,197,94,0.1)",  text: "#4ade80" },
  medium: { label: "Medium", dot: "#eab308", bg: "rgba(234,179,8,0.1)",  text: "#facc15" },
  high:   { label: "High",   dot: "#ef4444", bg: "rgba(239,68,68,0.1)",  text: "#f87171" },
};

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const p = priorityConfig[task.priority];

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(task._id);
      onDelete(task._id);
    } catch (error) {
      console.error(error);
      setDeleting(false);
    }
  };

  return (
    <>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--border)",
        opacity: deleting ? 0.4 : 1,
        transition: "all 0.2s ease",
      }}
        className="rounded-xl p-4 flex flex-col gap-2 cursor-default
                   hover:border-violet-500/40 hover:shadow-md
                   hover:shadow-violet-900/20 hover:-translate-y-0.5
                   transition-all duration-200">

        {/* Priority badge */}
        <div className="flex items-center justify-between">
          <span style={{ background: p.bg, color: p.text }}
            className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span style={{
              background: p.dot,
              width: 5, height: 5,
              borderRadius: "50%",
              display: "inline-block"
            }} />
            {p.label}
          </span>

          {/* Action buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100">
            <button onClick={() => setShowModal(true)}
              style={{ color: "var(--accent-light)" }}
              className="text-xs hover:opacity-70 transition-opacity">
              ✏️
            </button>
            <button onClick={handleDelete}
              className="text-xs text-red-400 hover:opacity-70 transition-opacity">
              🗑️
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Syne", color: "var(--text-primary)" }}
          className="font-semibold text-sm leading-snug">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p style={{ color: "var(--text-secondary)" }}
            className="text-xs leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-1 pt-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ color: "var(--text-secondary)" }} className="text-xs">
            {new Date(task.createdAt).toLocaleDateString("el-GR", {
              day: "numeric", month: "short"
            })}
          </span>
          <div className="flex gap-2">
            <button onClick={() => setShowModal(true)}
              style={{ color: "var(--accent-light)" }}
              className="text-xs font-medium hover:opacity-70 transition-opacity">
              Edit
            </button>
            <button onClick={handleDelete}
              className="text-xs font-medium text-red-400 hover:opacity-70 transition-opacity">
              Del
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default TaskCard;