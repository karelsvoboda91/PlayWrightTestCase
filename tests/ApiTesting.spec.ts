import { test, expect } from '@playwright/test';
import { TasksApi, Configuration, CreateTask } from '../generated-client';

const config = new Configuration({
  basePath: 'http://localhost:8080',
});

const apiClient = new TasksApi(config);

test('API Testing', async () => {
  const getTasksResponse = await apiClient.tasksGet();
  expect(getTasksResponse.status).toBe(200);
  expect(Array.isArray(getTasksResponse.data)).toBe(true);

  const newTask: CreateTask = { text: 'Testovací úkol3' };
  const createTaskResponse = await apiClient.tasksPost(newTask);
  expect(createTaskResponse.status).toBe(200);
  expect(createTaskResponse.data.text).toBe('Testovací úkol3');
  expect(createTaskResponse.data.completed).toBe(false);
  const taskId = createTaskResponse.data.id;

  const completeTaskResponse = await apiClient.tasksIdCompletePost(taskId);
  expect(completeTaskResponse.status).toBe(200);
  expect(completeTaskResponse.data.completed).toBe(true);

  const deleteTaskResponse = await apiClient.tasksIdDelete(taskId);
  expect(deleteTaskResponse.status).toBe(200);
});