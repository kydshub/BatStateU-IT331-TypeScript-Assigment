function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value;
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("taskList");
    let newTask = document.createElement("div");
    newTask.textContent = taskText;

    taskList.appendChild(newTask);
    taskInput.value = ""; // Clear the input field

    saveTasks(); // Save tasks to local storage
}

function saveTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].textContent);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            let newTask = document.createElement("div");
            newTask.textContent = tasks[i];
            taskList.appendChild(newTask);
        }
    }
}

// Load tasks when the page loads
window.onload = loadTasks;
