window.onload = function() {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'index.html';
  } else {
    document.getElementById('usernameDisplay').textContent = username;
  }

  const taskList = document.getElementById('taskList');
  const taskTitleInput = document.getElementById('taskTitleInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const addTaskBtn = document.getElementById('addTaskBtn');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');

      const taskContent = `
        <strong>${task.title}</strong>
        <span>${task.description}</span>
      `;
      li.innerHTML = taskContent;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteBtn';
      deleteBtn.addEventListener('click', function() {
        deleteTask(index);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  addTaskBtn.addEventListener('click', function() {
    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    if (taskTitle && taskDescription) {
      tasks.push({ title: taskTitle, description: taskDescription });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskTitleInput.value = '';
      taskDescriptionInput.value = '';
    }
  });

  renderTasks();

  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
};
