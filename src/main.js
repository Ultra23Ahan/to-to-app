let counter = 1;
let taskNameInput = document.getElementById("taskName");

// Function to load tasks from localStorage and render them
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const ol = document.querySelector("ol");
  tasks.forEach((task) => {
    const licontainer = document.createElement("div");
    licontainer.classList.add("licontainer", `licontainer-${task.id}`);
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete-button");

    li.textContent = task.name;
    deleteButton.onclick = () => deleteItem(task.id);
    ol.appendChild(licontainer);
    licontainer.appendChild(li);
    licontainer.appendChild(deleteButton);
  });
}

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(event) {
  event.preventDefault();
  const ol = document.querySelector("ol");
  const li = document.createElement("li");
  const licontainer = document.createElement("div");
  licontainer.classList.add("licontainer");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash", "delete-button");

  let taskName = document.getElementById("taskName").value;
  if (typeof taskName === "string" && taskName.length > 0) {
    const id = counter++;
    licontainer.classList.add(`licontainer-${id}`);
    li.textContent = taskName;
    deleteButton.onclick = () => deleteItem(id);

    ol.appendChild(licontainer);
    licontainer.appendChild(li);
    licontainer.appendChild(deleteButton);

    // Save task to localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: id, name: taskName });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskNameInput.value = ""; // clear input
  }
}

function deleteItem(id) {
  // Delete from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));

  // Remove the task from the DOM
  let elementToDelete = document.querySelector(`.licontainer-${id}`);
  elementToDelete.remove();
}
