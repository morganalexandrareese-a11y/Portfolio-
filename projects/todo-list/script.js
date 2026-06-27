const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const tasksContainer = document.getElementById('tasks-container');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clear-btn');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStats() {
    const completed = tasks.filter(t => t.completed).length;
    totalCount.textContent = tasks.length;
    completedCount.textContent = completed;
}

function renderTasks() {
    tasksContainer.innerHTML = '';
    
    const filtered = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'active') return !task.completed;
        return true;
    });
    
    if (filtered.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
    
    filtered.forEach((task, index) => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
            <span class="task-text">${task.text}</span>
            <button class="task-delete">Delete</button>
        `;
        
        const checkbox = taskEl.querySelector('.task-checkbox');
        const deleteBtn = taskEl.querySelector('.task-delete');
        
        checkbox.addEventListener('change', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            updateStats();
        });
        
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            renderTasks();
            updateStats();
        });
        
        tasksContainer.appendChild(taskEl);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
        updateStats();
    }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    updateStats();
});

renderTasks();
updateStats();