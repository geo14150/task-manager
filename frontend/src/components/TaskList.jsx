import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        Δεν υπάρχουν tasks ακόμα. Πρόσθεσε μία! 👆
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;