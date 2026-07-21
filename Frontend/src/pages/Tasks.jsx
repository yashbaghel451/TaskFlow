import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import api from "../api/axiosApi";
//import toast from "react-hot-toast";
import { toast } from "react-toastify";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);

      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, status, priority]);

  const handleCreate = async (taskData) => {
    try {
      await api.post("/tasks", taskData);

      toast.success("Task Created Successfully 🎉");

      setModalOpen(false);
      loadTasks();
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await api.put(`/tasks/${selectedTask._id}`, taskData);

      toast.info("Task Updated ✏️");

      setSelectedTask(null);
      setModalOpen(false);

      loadTasks();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/tasks/${id}`);

      toast.error("Task Deleted 🗑️");

      loadTasks();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);

      toast.success("Task Status Updated ✅");

      loadTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
  return (
    <>
      <Navbar />
      <div className="loading">
        <h2>Loading Tasks...</h2>
      </div>
    </>
  );
}

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-heading">
          <div>
            <h1>My Tasks</h1>
            <p>Create, update, and manage all your tasks.</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedTask(null);
              setModalOpen(true);
            }}
          >
            + New Task
          </button>
        </div>

        <div className="filters">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadTasks();
            }}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="TO-DO">TO-DO</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button className="btn btn-secondary" onClick={loadTasks}>
            Search
          </button>
        </div>

        <div className="task-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <h2>No tasks found</h2>
              <p>Create your first task to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-card-top">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>

                  <span className={`status status-${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <h2>{task.title}</h2>
                <p>{task.description}</p>

                <div className="task-meta">
                  <span>📁 {task.category}</span>
                  {task.dueDate && (
                    <span
                      style={{
                        color:
                          new Date(task.dueDate) < new Date() ? "red" : "green",
                      }}
                    >
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="task-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleToggle(task._id)}
                  >
                    {task.status === "Done" ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={selectedTask ? handleUpdate : handleCreate}
        task={selectedTask}
      />
    </>
  );
};

export default Tasks;
