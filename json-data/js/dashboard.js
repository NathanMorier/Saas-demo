import { supabase } from './supabaseClient.js';

window.onload = async function() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // No active session, redirect to login
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('usernameDisplay').textContent = user.email;

  const taskList = document.getElementById('taskList');
  const taskTitleInput = document.getElementById('taskTitleInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const addTaskBtn = document.getElementById('addTaskBtn');

  // Fetch existing tasks from Supabase
  await fetchTasks();

  async function fetchTasks() {
    const userId = user.id; // Get the current user's ID
    const { data: tasks, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq('user_id', userId); // Filter tasks by user's ID

    if (error) {
      console.error('Fetch error:', error);
      return []; // Return an empty array if there's an error
    }

    renderTasks(tasks);
    return tasks; // Return tasks for further use if needed
  }

  function renderTasks(tasks) {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      taskList.innerHTML = '<li>No tasks available.</li>';
      return;
    }
    tasks.forEach((task) => {
      const li = document.createElement('li');

      const taskContent = `
        <strong>${task.task_title}</strong>
        <span>${task.task_description}</span>
      `;
      li.innerHTML = taskContent;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteBtn';
      deleteBtn.addEventListener('click', function() {
        console.log(`Deleting task with ID: ${task.id}`); // Log task ID
        deleteTask(task.id); // Assuming you have an id column in your table
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  async function deleteTask(taskId) {
    console.log(`Attempting to delete task with ID: ${taskId}`); // Log before deletion attempt
    const { error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', taskId); // Assuming you have an 'id' column for unique identification

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      console.log(`Successfully deleted task with ID: ${taskId}`); // Log success
      const tasksAfterDelete = await fetchTasks(); // Fetch tasks again after deletion to update the list
      if (tasksAfterDelete.length === 0) {
        console.log('No tasks available after deletion.');
      } else {
        console.log(`Tasks available after deletion: ${tasksAfterDelete.length}`);
      }
    }
  }


  addTaskBtn.addEventListener('click', async function() {
    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    const userId = user.id; // Get the current user's ID

    if (taskTitle && taskDescription) {
      const { data, error } = await supabase
        .from('Tasks')
        .insert([{
          task_title: taskTitle,
          task_description: taskDescription,
          user_id: userId // Save the user's ID with the task
        }]);

      if (error) {
        console.error('Error adding task:', error);
      } else {
        renderTasks(await fetchTasks());
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
      }
    }
  });


  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
};
