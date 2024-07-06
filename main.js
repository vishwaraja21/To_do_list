let tasks = [];

const renderTasks = () => {
  const todoList = document.getElementById('todoList');
  const filter = document.getElementById('filterSelect').value;

  todoList.innerHTML = '';

  tasks.forEach((task) => {
    if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)) {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.title}</span>
        <button class="delete-btn">X</button>
      `;
      li.querySelector('input').addEventListener('change', () => toggleTaskCompleted(task.id));
      li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
      todoList.appendChild(li);
    }
  });
};

const addTask = (title) => {
  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
};


const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
};

const toggleTaskCompleted = (id) => {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveTasks();
  renderTasks();
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
  renderTasks();
};

document.getElementById('add-task-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.getElementById('new-task').value.trim();
  if (title) {
    addTask(title);
    document.getElementById('new-task').value = '';
  } else {
    alert('Please enter a task title.');
  }
});

document.getElementById('filterSelect').addEventListener('change', renderTasks);

loadTasks();