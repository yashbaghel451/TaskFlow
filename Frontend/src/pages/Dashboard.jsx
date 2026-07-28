import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import api from "../api/axiosApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const [recentTasks, setRecentTasks] = useState([]);

  const [weeklyData, setWeeklyData] = useState([]);

  const progress =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const chartData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
    { name: "Overdue", value: stats.overdue },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [statsResponse, tasksResponse] = await Promise.all([
          api.get("/tasks/stats"),
          api.get("/tasks?sort=oldest"),
        ]);

        const tasks = tasksResponse.data.tasks;

        console.log("Tasks from Backend:", tasks);

        setStats(statsResponse.data);
        setRecentTasks(tasks.slice(-5).reverse());

        // Last 7 days ka data
        const today = new Date();

        const last7Days = Array.from({ length: 7 }, (_, index) => {
          const date = new Date(today);

          date.setDate(today.getDate() - (6 - index));

          return {
            date: date.toISOString().split("T")[0],
            name: date.toLocaleDateString("en-US", {
              weekday: "short",
            }),
            completed: 0,
          };
        });

        // Completed tasks ko date ke according count karna
        tasks.forEach((task) => {
          if (!task.completed || !task.updatedAt) return;

          const taskDate = new Date(task.updatedAt);

          if (isNaN(taskDate.getTime())) return;

          const taskDateString = taskDate.toISOString().split("T")[0];

          const dayData = last7Days.find((day) => day.date === taskDateString);

          if (dayData) {
            dayData.completed += 1;
          }
        });

        setWeeklyData(last7Days);

        // Completed tasks ko last 7 days ke according count karna
        tasks.forEach((task) => {
          if (task.completed && task.updatedAt) {
            const taskDate = new Date(task.updatedAt);

            const taskYear = taskDate.getFullYear();
            const taskMonth = taskDate.getMonth();
            const taskDay = taskDate.getDate();

            const dayData = last7Days.find((day) => {
              return (
                day.date.getFullYear() === taskYear &&
                day.date.getMonth() === taskMonth &&
                day.date.getDate() === taskDay
              );
            });

            if (dayData) {
              dayData.completed += 1;
            }
          }
        });

        console.log("Weekly Productivity Data:", last7Days);

        setWeeklyData(last7Days);

        setWeeklyData(last7Days);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">
          <h2>Loading Dashboard...</h2>
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
            <h1>Dashboard</h1>
            <p>Track your productivity and manage your tasks.</p>
          </div>

          <Link to="/tasks" className="btn btn-primary">
            View All Tasks
          </Link>
        </div>

        <div className="welcome-card">
          <div>
            <h2>👋 Welcome Back</h2>
            <p>Stay focused and complete your goals today.</p>
          </div>

          <div className="progress-box">
            <span>{progress}% Completed</span>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaTasks className="stat-icon" />
            <span>Total Tasks</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            <FaCheckCircle className="stat-icon" />
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>

          <div className="stat-card">
            <FaClock className="stat-icon" />
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>

          <div className="stat-card">
            <FaExclamationTriangle className="stat-icon" />
            <span>Overdue</span>
            <strong>{stats.overdue}</strong>
          </div>
        </div>

        <section className="section-card">
          <h2 style={{ marginBottom: "20px" }}>Task Overview</h2>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={100} label>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-summary">
            <p>🟢 Completed : {stats.completed}</p>
            <p>🟡 Pending : {stats.pending}</p>
            <p>🔴 Overdue : {stats.overdue}</p>
            <p>
              <strong>Progress: {progress}%</strong>
            </p>
          </div>
        </section>

        <br />

        <section className="section-card">
          <h2 style={{ marginBottom: "20px" }}>Weekly Productivity</h2>

          <p style={{ marginBottom: "20px" }}>
            Tasks completed during the last 7 days.
          </p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="completed"
                  name="Completed Tasks"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <br />

        <section className="section-card">
          <div className="section-header">
            <h2>Recent Tasks</h2>

            <Link to="/tasks">See all →</Link>
          </div>

          {recentTasks.length === 0 ? (
            <p className="empty-state">No tasks found.</p>
          ) : (
            <div className="task-list">
              {recentTasks.map((task) => (
                <div className="task-row" key={task._id}>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.category}</p>
                  </div>

                  <span className={`status status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
