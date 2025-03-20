import { test, expect } from '@playwright/test';
import { TasksApi, Configuration, CreateTask } from '../generated-client';

const config = new Configuration({
  basePath: 'http://localhost:8080',
});

const apiClient = new TasksApi(config);

test('API Testing', async () => {
  const response = await apiClient.tasksGet();
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);

  const newTask: CreateTask = { text: 'Testovací úkol3' };
  const response2 = await apiClient.tasksPost(newTask);
  expect(response2.status).toBe(200);
  expect(response2.data.text).toBe('Testovací úkol3');
  expect(response2.data.completed).toBe(false);
  
  const taskId = response2.data.id;

  const response3 = await apiClient.tasksIdCompletePost(taskId);
  expect(response3.status).toBe(200);
  expect(response3.data.completed).toBe(true);

  const response4 = await apiClient.tasksIdDelete(taskId);
  expect(response4.status).toBe(200);
});