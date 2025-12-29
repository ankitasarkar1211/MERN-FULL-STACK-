/*
Full React app (single-file) containing all components required for the "Conditional Rendering Tasks" assignment.
Usage:
1. Create a new React project (Vite or CRA). Example with Vite:
npm create vite@latest my-app -- --template react
cd my-app
npm install
2. Replace src/App.jsx with the contents of this file.
3. Ensure src/main.jsx (or index.js) renders <App />.
4. Optionally add basic CSS from the comment at the bottom into src/index.css and import it from main.jsx.
This single file contains: App (default export), Modal, TaskDetails, TaskItem, EmptyState, PriorityBadge.
No external UI libraries required.
*/

import React, { useEffect, useRef, useState } from "react";
// utilities
const uid = () => Math.random().toString(36).slice(2, 9);
const nowISOString = () => new Date().toISOString();
/* PriorityBadge: returns styled span depending on priority and completed state */
function PriorityBadge({ priority, completed }) {
  const base = {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  };
  if (completed)
    return (
      <span style={{ ...base, background: "#10B981", color: "white" }}>
        Completed
      </span>
    );
  if (priority === "High")
    return (
      <span style={{ ...base, background: "#ef4444", color: "white" }}>
        URGENT
      </span>
    );
  if (priority === "Medium")
    return (
      <span style={{ ...base, background: "#f59e0b", color: "black" }}>
        Medium
      </span>
    );
  return (
    <span style={{ ...base, background: "#9ca3af", color: "white" }}>Low</span>
  );
}
/* Modal: mounts only when `open` is true. Handles Escape to close. */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null; // unmount when closed
  const backdropStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  };
  const boxStyle = {
    width: "100%",
    maxWidth: 720,
    background: "white",
    borderRadius: 8,
    padding: 18,
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  };
  return (
    <div style={backdropStyle} role="dialog" aria-modal="true">
      <div style={boxStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
/* EmptyState component */
function EmptyState({ onAdd, onReset }) {
  return (
    <div
      style={{
        border: "1px dashed #cbd5e1",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 8 }}> </div>
      <div style={{ fontWeight: 700 }}>No tasks here yet</div>
      <div style={{ marginTop: 8, color: "#475569" }}>
        Try adding a new task or reset the filter.
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <button onClick={onAdd} style={{ padding: "8px 12px" }}>
          Add Task
        </button>
        <button onClick={onReset} style={{ padding: "8px 12px" }}>
          Reset Filter
        </button>
      </div>
    </div>
  );
}
/* TaskDetails: shown inside modal. Has inline edit toggled conditionally. */
function TaskDetails({ task, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: task.title,
    description: task.description || "",
  });
  useEffect(() => {
    setDraft({ title: task.title, description: task.description || "" });
    setEditing(false);
  }, [task]);
  function save() {
    const updated = {
      ...task,
      title: draft.title,
      description: draft.description,
      history: [
        { when: nowISOString(), note: "Edited details" },
        ...(task.history || []),
      ],
    };
    onUpdate(updated);
    setEditing(false);
  }
  return (
    <div>
      <h3 style={{ margin: 0 }}>{editing ? "Edit Task" : "Task Details"}</h3>
      {editing ? (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", fontSize: 13 }}>Title</label>
          <input
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
          <label style={{ display: "block", fontSize: 13, marginTop: 10 }}>
            Description
          </label>
          <textarea
            value={draft.description}
            onChange={(e) =>
              setDraft((d) => ({ ...d, description: e.target.value }))
            }
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={save} style={{ padding: "8px 12px" }}>
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{ padding: "8px 12px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>{task.title}</div>
          <div style={{ color: "#475569", marginTop: 6 }}>
            {task.description || <em>No description</em>}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            Created: {new Date(task.createdAt).toLocaleString()}
          </div>
          {(task.history || []).length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>History</div>
              <ul style={{ paddingLeft: 18 }}>
                {task.history.map((h, i) => (
                  <li key={i} style={{ fontSize: 13 }}>
                    {new Date(h.when).toLocaleString()}: {h.note}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setEditing(true)}
              style={{ padding: "8px 12px" }}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
/* TaskItem: represents a row -- demonstrates conditional rendering using && and ternary inside */
function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onOpenDetails,
  compact,
}) {
  const [hover, setHover] = useState(false);
  // show Completed label when completed; else show priority badges (ternary nested)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: "1px solid #e6e9ef",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ cursor: "pointer" }} onClick={() => onOpenDetails(task)}>
          {/* Title: if completed show strikethrough */}
          <div
            style={{
              fontWeight: 600,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#6b7280" : "#0f172a",
            }}
          >
            {task.title}
          </div>
          {/* Detailed view includes description and createdAt */}
          {!compact && (
            <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
              {task.description || <em>No description</em>}
            </div>
          )}
        </div>
        {/* badge */}
        <div>
          {/* If completed show green label, else show priority-specific */}
          {task.completed ? (
            <PriorityBadge priority={task.priority} completed />
          ) : (
            <PriorityBadge priority={task.priority} completed={false} />
          )}
        </div>
      </div>
      {/* Actions area revealed on hover (uses && conditional rendering) */}
      {hover && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onToggleComplete(task.id)}
            style={{ padding: "6px 10px" }}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button
            onClick={() => onOpenDetails(task)}
            style={{ padding: "6px 10px" }}
          >
            Details
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{ padding: "6px 10px" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
/* App: main component */
export default function App() {
  const [tasks, setTasks] = useState(() => [
    {
      id: uid(),
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      priority: "Medium",
      completed: false,
      createdAt: nowISOString(),
      history: [],
    },
    {
      id: uid(),
      title: "Pay bills",
      description: "Electricity + Internet",
      priority: "High",
      completed: false,
      createdAt: nowISOString(),
      history: [],
    },
    {
      id: uid(),
      title: "Walk the dog",
      description: "Evening walk",
      priority: "Low",
      completed: true,
      createdAt: nowISOString(),
      history: [],
    },
  ]);
  const [compact, setCompact] = useState(false); // false -> Detailed view default
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [validation, setValidation] = useState("");
  const [detailsTask, setDetailsTask] = useState(null);
  const inputRef = useRef(null);
  // When user types in title, clear validation
  useEffect(() => {
    if (title) setValidation("");
  }, [title]);
  function addTask() {
    if (!title.trim()) {
      setValidation("Title required");
      inputRef.current?.focus();
      return;
    }
    const t = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      createdAt: nowISOString(),
      history: [],
    };
    setTasks((s) => [t, ...s]);
    setTitle("");
    setDescription("");
    setPriority("Low");
  }
  function toggleComplete(id) {
    setTasks((s) =>
      s.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              history: [
                {
                  when: nowISOString(),
                  note: t.completed ? "Marked active" : "Marked completed",
                },
                ...(t.history || []),
              ],
            }
          : t
      )
    );
  }
  function deleteTask(id) {
    setTasks((s) => s.filter((t) => t.id !== id));
  }
  function updateTask(updated) {
    setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
    setDetailsTask(updated);
  }
  // compute visible tasks using switch/ternary
  const visibleTasks = (() => {
    switch (filter) {
      case "Active":
        return tasks.filter((t) => !t.completed);
      case "Completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  })();
  // empty state actions
  function focusAddInput() {
    inputRef.current?.focus();
  }
  function openDetails(task) {
    setDetailsTask(task);
  }
  function closeDetails() {
    setDetailsTask(null);
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: 24,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          background: "white",
          padding: 18,
          borderRadius: 10,
          boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Conditional Rendering Tasks</h1>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Demonstrates if/ternary/&&/short-circuiting and
              mounting/unmounting.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 14 }}>
              {compact ? "Compact View" : "Detailed View"}
            </div>
            <button
              onClick={() => setCompact((c) => !c)}
              style={{ padding: "8px 12px" }}
            >
              Toggle
            </button>
          </div>
        </div>
        {/* Input area */}
        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <input
              ref={inputRef}
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e6e9ef",
              }}
            />
            {validation && (
              <div style={{ color: "#ef4444", marginTop: 6 }}>{validation}</div>
            )}
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e6e9ef",
                marginTop: 8,
              }}
            />
          </div>
          <div
            style={{
              width: 180,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginLeft: 15,
            }}
          >
            <label style={{ fontSize: 13 }}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: 8, borderRadius: 8 }}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              onClick={addTask}
              style={{
                padding: 10,
                borderRadius: 8,
                background: "#2563eb",
                color: "white",
                fontWeight: 700,
              }}
            >
              Add
            </button>
          </div>
        </div>
        {/* Filters */}
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border:
                  filter === f ? "2px solid #3b82f6" : "1px solid #e6e9ef",
                background: filter === f ? "#e6f0ff" : "white",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Task list */}
        <div style={{ marginTop: 18 }}>
          {/* Render different JSX trees for Detailed vs Compact */}
          {compact ? (
            // Compact tree: simpler markup
            <div style={{ display: "grid", gap: 8 }}>
              {visibleTasks.length === 0 ? (
                <EmptyState
                  onAdd={focusAddInput}
                  onReset={() => setFilter("All")}
                />
              ) : (
                visibleTasks.map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    onOpenDetails={openDetails}
                    compact={true}
                  />
                ))
              )}
            </div>
          ) : (
            // Detailed tree: richer structure
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visibleTasks.length === 0 ? (
                <EmptyState
                  onAdd={focusAddInput}
                  onReset={() => setFilter("All")}
                />
              ) : (
                visibleTasks.map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    onOpenDetails={openDetails}
                    compact={false}
                  />
                ))
              )}
            </div>
          )}
        </div>
        {/* TaskDetails modal mounted conditionally */}
        <Modal open={!!detailsTask} onClose={closeDetails}>
          {/* Only render TaskDetails when detailsTask is truthy */}
          {detailsTask && (
            <TaskDetails task={detailsTask} onUpdate={updateTask} />
          )}
        </Modal>
      </div>
    </div>
  );
}
