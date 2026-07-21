import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
  category: "general",
  status: "To-Do",
};

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        priority: task.priority || "medium",
        category: task.category || "general",
        status: task.status || "To-Do",
      });
    } else {
      setFormData(initialState);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Create Task"}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
             <option value="Done">Done</option>
          </select>

          <button className="btn btn-primary" type="submit">
            {task ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
