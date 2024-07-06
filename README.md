#index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>WORK TO-DOS</h1>
        <p>Enter text into the input field to add items to your list.</p>
        <p>Click the item to mark it as complete.</p>
        <p>Click the "X" to remove the item from your list.</p>
        
        <div class="input-container">
            <input type="text" id="new-task" placeholder="New item...">
            <button id="add-task-btn">Add Task</button>
        </div>

        <ul id="todoList"></ul>

        <div class="filter-container">
            <select id="filterSelect">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>
```
##css
```
body {
    font-family: Arial, sans-serif;
    background: rgb(63,94,251);
    background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%); 
    color: #f1efef;
    text-align: center;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    margin-top: 20px;
    font-size:xx-large;
}

p{
    color: #ffffff;
    font-weight: 300;
}

input, button, select {
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

input {
    flex: 1;
    margin-right: 10px;
}

button {
    background-color: #00796b;
    color: rgb(255, 255, 255);
    cursor: pointer;
}

button:hover {
    background-color: #004d40;
}

.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #2e98c5a0;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    display:flexbox;
    justify-content:flex-end;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
    background-color: #239dcd;
}

.delete-btn {
    background-color: transparent;
    border: none;
    color: rgb(235, 10, 10);
    cursor: pointer;
    margin-left: 10px;
}

.filter-container {
    margin-top: 20px;
}
```
##js
```
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
```
##output
![image](https://github.com/vishwaraja21/To_do_list/assets/102411421/edf45588-6ea0-4b74-9698-a2c7f89b7bdd)
