import { supabase } from './supabaseClient.js';

window.onload = async function() {
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

  // Fetch tasks from the database
  async function fetchTasks() {
    const { data: tasks, error } = await supabase.from('Tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
      return []; // Return an empty array in case of error
    }
    console.log('Fetched tasks:', tasks); // Log the fetched tasks
    return tasks; // Return the tasks for rendering
  }

  // Render tasks to the UI
  function renderTasks(tasks) {
    console.log('Rendering tasks:', tasks); // Add this line to see the tasks being rendered
    taskList.innerHTML = ''; // Clear the task list before rendering
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.task_title}</strong>
            <span>${task.task_description}</span>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
  }

  // Delete a task from the database
  async function deleteTask(taskId) {
    const { error } = await supabase.from('Tasks').delete().eq('id', taskId);
    if (error) {
      console.error('Error deleting task:', error);
    } else {
      const tasks = await fetchTasks(); // Fetch updated tasks after deletion
      renderTasks(tasks); // Render the updated task list
    }
  }

  // Event listener for adding a new task
  addTaskBtn.addEventListener('click', async function() {
    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    if (taskTitle && taskDescription) {
      const { error } = await supabase.from('Tasks').insert([{ task_title: taskTitle, task_description: taskDescription }]);
      if (error) {
        console.error('Error adding task:', error);
      } else {
        const tasks = await fetchTasks(); // Fetch updated tasks after adding
        renderTasks(tasks); // Render the updated task list
        taskTitleInput.value = ''; // Clear input fields
        taskDescriptionInput.value = '';
      }
    }
  });

  // Initial fetch and render tasks on page load
  const tasks = await fetchTasks();
  renderTasks(tasks);

  // Event listener for logout
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
};
