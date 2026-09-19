import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // GET TASKS
  // =========================

  const getTasks = async () => {
    try {
      setServerError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setTasks(data.tasks || []);
    } catch (error) {
      setServerError(
        "Unable to connect to the server. Please make sure Django is running."
      );
    }
  };


  useEffect(() => {
    getTasks();
  }, []);


  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      newErrors.title = "Task name is required.";
    } else if (cleanTitle.length < 3) {
      newErrors.title =
        "Task name must contain at least 3 characters.";
    }

    if (!cleanDescription) {
      newErrors.description =
        "Description is required.";
    } else if (cleanDescription.length < 5) {
      newErrors.description =
        "Description must contain at least 5 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // =========================
  // ADD / UPDATE TASK
  // =========================

  const saveTask = async (e) => {
    e.preventDefault();

    setMessage("");
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const currentTask = tasks.find(
        (task) => task.id === editingId
      );

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          completed: currentTask
            ? currentTask.completed
            : false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(
          "Unable to save the task. Please check your details."
        );
        return;
      }

      if (editingId) {
        setMessage("Task updated successfully.");
      } else {
        setMessage("Task added successfully.");
      }

      setTitle("");
      setDescription("");
      setEditingId(null);
      setErrors({});

      await getTasks();

    } catch (error) {
      setServerError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // EDIT TASK
  // =========================

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);

    setEditingId(task.id);

    setErrors({});
    setMessage("");
    setServerError("");

    document
      .getElementById("add-task")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setErrors({});
  };


  // =========================
  // COMPLETE / UNDO
  // =========================

  const toggleTask = async (task) => {
    try {
      setServerError("");

      const response = await fetch(
        `${API_URL}${task.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: !task.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      await getTasks();

    } catch (error) {
      setServerError(
        "Unable to update the task."
      );
    }
  };


  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setServerError("");

      const response = await fetch(
        `${API_URL}${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("Task deleted successfully.");

      await getTasks();

    } catch (error) {
      setServerError(
        "Unable to delete the task."
      );
    }
  };


  // =========================
  // STATISTICS
  // =========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;


  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="logo">
          Task Tracker
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#overview">
            Task Overview
          </a>

          <a href="#add-task">
            Add Task
          </a>

          <a href="#tasks">
            My Tasks
          </a>

          <a href="#about">
            About
          </a>

        </div>

      </nav>


      <main className="container">

        {/* =========================
            HERO
        ========================= */}

        <section
          className="hero"
          id="home"
        >

          <p className="eyebrow">
            TASK MANAGEMENT
          </p>

          <h1>
            Manage Your Tasks
            <br />
            In One Place.
          </h1>

          <p className="hero-text">
            Create, organize and complete your daily tasks
            with a simple and efficient task management system.
          </p>

        </section>


        {/* =========================
            SERVER ERROR
        ========================= */}

        {serverError && (
          <div className="alert error-alert">
            {serverError}
          </div>
        )}


        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        {message && (
          <div className="alert success-alert">
            {message}
          </div>
        )}


        {/* =========================
            TASK OVERVIEW
        ========================= */}

        <section
          className="overview-section"
          id="overview"
        >

          <div className="section-heading">

            <div>

              <p className="section-label">
                OVERVIEW
              </p>

              <h2>
                Task Overview
              </h2>

            </div>

          </div>


          <div className="overview-grid">

            <div className="overview-card">

              <span>
                Total Tasks
              </span>

              <strong>
                {totalTasks}
              </strong>

              <p>
                All tasks
              </p>

            </div>


            <div className="overview-card">

              <span>
                Completed
              </span>

              <strong>
                {completedTasks}
              </strong>

              <p>
                Finished tasks
              </p>

            </div>


            <div className="overview-card">

              <span>
                Pending
              </span>

              <strong>
                {pendingTasks}
              </strong>

              <p>
                Tasks remaining
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            ADD / EDIT TASK
        ========================= */}

        <section
          className="add-section"
          id="add-task"
        >

          <div className="add-header">

            <div>

              <p className="section-label">
                {editingId
                  ? "UPDATE TASK"
                  : "CREATE TASK"}
              </p>

              <h2>
                {editingId
                  ? "Edit Task"
                  : "Add New Task"}
              </h2>

            </div>

            <span className="plus-icon">
              {editingId ? "✎" : "+"}
            </span>

          </div>


          <form onSubmit={saveTask}>

            {/* TASK NAME */}

            <div className="form-group">

              <label>
                Task Name
              </label>

              <input
                type="text"
                placeholder="Enter task name"
                value={title}
                maxLength={200}
                onChange={(e) => {
                  setTitle(e.target.value);

                  if (errors.title) {
                    setErrors({
                      ...errors,
                      title: "",
                    });
                  }
                }}
              />

              {errors.title && (
                <span className="field-error">
                  {errors.title}
                </span>
              )}

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);

                  if (errors.description) {
                    setErrors({
                      ...errors,
                      description: "",
                    });
                  }
                }}
              />

              {errors.description && (
                <span className="field-error">
                  {errors.description}
                </span>
              )}

            </div>


            <div className="form-buttons">

              <button
                className="add-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Task"
                    : "+ Add Task"}
              </button>


              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>


        {/* =========================
            MY TASKS
        ========================= */}

        <section
          className="tasks-section"
          id="tasks"
        >

          <div className="section-heading">

            <div>

              <p className="section-label">
                TASK LIST
              </p>

              <h2>
                My Tasks
              </h2>

            </div>

            <span className="task-badge">
              {totalTasks}{" "}
              {totalTasks === 1
                ? "Task"
                : "Tasks"}
            </span>

          </div>


          {/* NO TASKS */}

          {tasks.length === 0 ? (

            <div className="empty-state">

              <h3>
                No tasks yet
              </h3>

              <p>
                Add your first task using the form above.
              </p>

            </div>

          ) : (

            <div className="task-list">

              {tasks.map((task) => (

                <div
                  className="task-card"
                  key={task.id}
                >

                  <div className="task-details">

                    <div className="task-title-row">

                      <h3
                        className={
                          task.completed
                            ? "completed"
                            : ""
                        }
                      >
                        {task.title}
                      </h3>

                      <span
                        className={
                          task.completed
                            ? "status completed-status"
                            : "status pending-status"
                        }
                      >
                        {task.completed
                          ? "Completed"
                          : "Pending"}
                      </span>

                    </div>

                    <p>
                      {task.description}
                    </p>

                  </div>


                  {/* ACTION BUTTONS */}

                  <div className="task-actions">

                    <button
                      className="complete-button"
                      onClick={() =>
                        toggleTask(task)
                      }
                    >
                      {task.completed
                        ? "Undo"
                        : "Complete"}
                    </button>


                    <button
                      className="edit-button"
                      onClick={() =>
                        editTask(task)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =========================
            ABOUT
        ========================= */}

        <section
          className="about-section"
          id="about"
        >

          <p className="section-label">
            ABOUT
          </p>

          <h2>
            About Task Tracker
          </h2>

          <p>
            Task Tracker is a simple task management
            application built using React and Django REST API.
            It allows users to create, manage and track their
            daily tasks.
          </p>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <p>
          Task Tracker &nbsp;•&nbsp; React + Django
        </p>

      </footer>

    </div>
  );
}

export default App;