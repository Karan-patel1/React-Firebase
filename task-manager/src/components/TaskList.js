import React, { useEffect, useState } from "react";
import axios from "axios";
import { database, ref, set, onValue } from "../firebase";

const TaskList = () => {
  const [tasks, setTasksState] = useState([]);

  const JSON_SERVER_URL = "http://localhost:3001/tasks";

  // Load tasks from JSON Server and sync to Firebase
  useEffect(() => {
    axios.get(JSON_SERVER_URL).then((res) => {
      setTasksState(res.data);
      set(ref(database, "tasks/"), res.data) // sync to Firebase
      .then(() => console.log("Synced to Firebase!"))
      .catch((error) => console.error("Firebase sync error:", error));
  
    });
  }, []);

  // Listen for real-time updates from Firebase
  useEffect(() => {
    const taskRef = ref(database, "tasks/");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTasksState(data);
      }
    });
  }, []);

  // Toggle task completion
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasksState(updatedTasks);

    // Update local JSON Server
    const updatedTask = updatedTasks.find((t) => t.id === id);
    axios.put(`${JSON_SERVER_URL}/${id}`, updatedTask);

    // Sync to Firebase
    set(ref(database, "tasks/"), updatedTasks);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
