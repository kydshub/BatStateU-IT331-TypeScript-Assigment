// script.ts
var Task = /** @class */ (function () {
    function Task(text) {
        this.text = text;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.taskList = document.getElementById("taskList");
        this.taskInput = document.getElementById("task");
        this.loadTasks();
    }
    TaskManager.prototype.addTask = function () {
        var taskText = this.taskInput.value;
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }
        var newTask = new Task(taskText);
        this.renderTask(newTask);
        this.taskInput.value = ""; // Clear the input field
        this.saveTasks(); // Save tasks to local storage
    };
    TaskManager.prototype.renderTask = function (task) {
        var taskElement = document.createElement("div");
        taskElement.textContent = task.text;
        this.taskList.appendChild(taskElement);
    };
    TaskManager.prototype.saveTasks = function () {
        var tasks = [];
        for (var i = 0; i < this.taskList.children.length; i++) {
            tasks.push({ text: this.taskList.children[i].textContent });
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    TaskManager.prototype.loadTasks = function () {
        var _this = this;
        var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(function (task) { return _this.renderTask(new Task(task.text)); });
    };
    TaskManager.prototype.filterTasks = function () {
        var filterInput = document.getElementById("filterTask").value.toLowerCase();
        var tasks = this.taskList.children;
        for (var i = 0; i < tasks.length; i++) {
            var taskText = tasks[i].textContent.toLowerCase();
            if (taskText.includes(filterInput)) {
                tasks[i].style.display = "";
            }
            else {
                tasks[i].style.display = "none";
            }
        }
    };
    return TaskManager;
}());
// Create a global instance of TaskManager
var taskManager = new TaskManager();
// Ensure the taskManager is available on window load
window.onload = function () { return taskManager; };
