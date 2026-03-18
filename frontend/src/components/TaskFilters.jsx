const TaskFilters = ({ filters, onChange, totalTasks }) => {
  const handleChange = (e) =>
    onChange({ ...filters, [e.target.name]: e.target.value });

  const clearFilters = () =>
    onChange({ search: "", status: "all", priority: "all" });

  const hasActiveFilters =
    filters.search || filters.status !== "all" || filters.priority !== "all";

  return (
    <div
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      className="rounded-2xl p-5 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-3 items-center">

        {/* Search */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            name="search"
            placeholder="Αναζήτηση task..."
            value={filters.search}
            onChange={handleChange}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none
                       focus:border-violet-500 transition-all placeholder-gray-600"
          />
        </div>

        {/* Status Filter */}
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          className="rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer
                     focus:border-violet-500 transition-all w-full md:w-auto"
        >
          <option value="all"         style={{ background: "#13131f" }}>📋 Όλα τα Status</option>
          <option value="todo"        style={{ background: "#13131f" }}>📋 Todo</option>
          <option value="in-progress" style={{ background: "#13131f" }}>🔄 In Progress</option>
          <option value="done"        style={{ background: "#13131f" }}>✅ Done</option>
        </select>

        {/* Priority Filter */}
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          className="rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer
                     focus:border-violet-500 transition-all w-full md:w-auto"
        >
          <option value="all"    style={{ background: "#13131f" }}>🎯 Όλες οι Προτεραιότητες</option>
          <option value="low"    style={{ background: "#13131f" }}>🟢 Low</option>
          <option value="medium" style={{ background: "#13131f" }}>🟡 Medium</option>
          <option value="high"   style={{ background: "#13131f" }}>🔴 High</option>
        </select>

        {/* Clear button — εμφανίζεται μόνο αν υπάρχουν ενεργά filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
              fontFamily: "Syne",
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold
                       hover:opacity-80 transition-all whitespace-nowrap w-full md:w-auto"
          >
            ✕ Καθαρισμός
          </button>
        )}
      </div>

      {/* Results count */}
      <p style={{ color: "var(--text-secondary)" }} className="text-xs mt-3">
        {hasActiveFilters ? (
          <>
            <span style={{ color: "var(--accent-light)" }} className="font-semibold">
              {totalTasks}
            </span>{" "}
            αποτελέσματα
          </>
        ) : (
          <>
            Σύνολο:{" "}
            <span style={{ color: "var(--accent-light)" }} className="font-semibold">
              {totalTasks}
            </span>{" "}
            tasks
          </>
        )}
      </p>
    </div>
  );
};

export default TaskFilters;