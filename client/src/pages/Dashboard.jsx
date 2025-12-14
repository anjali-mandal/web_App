import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    await API.post("/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingText(task.title);
  };

  const updateTask = async () => {
    if (!editingText) return;
    await API.put(`/tasks/${editingId}`, { title: editingText });
    setEditingId(null);
    setEditingText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>My Tasks</h2>

        {/* Add Task */}
        <div style={styles.addBox}>
          <input
            placeholder="Write a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Task List */}
        {tasks.map((task) => (
          <div key={task._id} style={styles.card}>
            {editingId === task._id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={styles.editInput}
                />
                <div>
                  <button onClick={updateTask} style={styles.saveBtn}>
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button
                    onClick={() => startEdit(task)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
    color: "#1e293b",
  },
  addBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5f5",
  },
  addBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  card: {
    background: "#ffffff",
    padding: "14px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  editBtn: {
    background: "#fef3c7",
    color: "#92400e",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editInput: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #fcd34d",
  },
  saveBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    marginRight: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
