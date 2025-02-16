// script.ts

interface ITask {
    text: string;
}

class Task implements ITask {
    constructor(public text: string) {}
}

class TaskManager {
    private taskList: HTMLElement;
    private taskInput: HTMLInputElement;

    constructor() {
        this.taskList = document.getElementById("taskList") as HTMLElement;
        this.taskInput = document.getElementById("task") as HTMLInputElement;
        this.loadTasks();
    }

    public addTask(): void {
        let taskText = this.taskInput.value;
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        let newTask = new Task(taskText);
        this.renderTask(newTask);

        this.taskInput.value = ""; // Clear the input field
        this.saveTasks(); // Save tasks to local storage
    }

    private renderTask(task: Task): void {
        let taskElement = document.createElement("div");
        taskElement.textContent = task.text;
        this.taskList.appendChild(taskElement);
    }

    private saveTasks(): void {
        let tasks: ITask[] = [];
        for (let i = 0; i < this.taskList.children.length; i++) {
            tasks.push({ text: this.taskList.children[i].textContent });
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    private loadTasks(): void {
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach((task: ITask) => this.renderTask(new Task(task.text)));
    }

    public filterTasks(): void {
        const filterInput = (document.getElementById("filterTask") as HTMLInputElement).value.toLowerCase();
        const tasks = this.taskList.children;

        for (let i = 0; i < tasks.length; i++) {
            const taskText = tasks[i].textContent.toLowerCase();
            if (taskText.includes(filterInput)) {
                (tasks[i] as HTMLElement).style.display = "";
            } else {
                (tasks[i] as HTMLElement).style.display = "none";
            }
        }
    }
}

// Create a global instance of TaskManager
const taskManager = new TaskManager();

// Ensure the taskManager is available on window load
window.onload = () => taskManager;
