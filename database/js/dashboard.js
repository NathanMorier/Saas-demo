import { supabase } from './supabaseClient.js';

window.onload = async function() {
  const { data: { user } } = await supabase.auth.getUser();
  document.getElementById('usernameDisplay').textContent = user.email;

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  const taskList = document.getElementById('taskList');
  const taskTitleInput = document.getElementById('taskTitleInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const addTaskBtn = document.getElementById('addTaskBtn');

  // Fetch existing tasks from Supabase
  await fetchTasks();
  async function fetchTasks() {
    const userId = user.id;
    const { data: tasks, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Fetch error:', error);
      return [];
    }

    renderTasks(tasks);
    return tasks;
  }

  // Render existing tasks from Supabase
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
        deleteTask(task.id);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Add task from supabase and from rendered list tasks
  async function deleteTask(taskId) {
    const { error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      // console.error('Error deleting task:', error);
    } else {
      // console.log(`Successfully deleted task with ID: ${taskId}`); // Log success
      const tasksAfterDelete = await fetchTasks(); // Fetch tasks again after deletion to update the list
      if (tasksAfterDelete.length === 0) {
        //console.log('No tasks available after deletion.');
      } else {
        //console.log(`Tasks available after deletion: ${tasksAfterDelete.length}`);
      }
    }
  }

  // Add new task to supabase and to rendered tasks
  addTaskBtn.addEventListener('click', async function() {
    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    const userId = user.id;

    if (taskTitle && taskDescription) {
      const { data, error } = await supabase
        .from('Tasks')
        .insert([{
          task_title: taskTitle,
          task_description: taskDescription,
          user_id: userId
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

  // logout from current session
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
};
