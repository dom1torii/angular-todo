import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';

import { Task } from '../components/task';

export interface TaskData {
  id: number;
  task: string;
  important: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField, Task],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  taskModel = signal<TaskData>({
    id: 0,
    task: '',
    important: false,
  })

  taskForm = form(this.taskModel);

  tasks = signal<TaskData[]>(this.loadTasks())
  completed = signal<TaskData[]>(this.loadCompleted())

  private nextTaskId = this.loadNextTaskId();

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()))
        localStorage.setItem('completed', JSON.stringify(this.completed()))
      }
    });
  }

  loadTasks(): TaskData[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : []
    }
    return []
  }

  loadCompleted(): TaskData[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCompleted = localStorage.getItem('completed');
      return storedCompleted ? JSON.parse(storedCompleted) : []
    }
    return []
  }

  loadNextTaskId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedId = localStorage.getItem('nextTaskId');
      return storedId ? Number(storedId) : 1
    }
    return 1
  }

  resetForm() {
    this.taskForm.task().value.set("")
    this.taskForm.important().value.set(false)
  }

  addTask() {
    if (this.taskForm.task().value() === "") return;
    const newTask: TaskData = {
      id: this.nextTaskId++,
      task: this.taskForm.task().value(),
      important: this.taskForm.important().value(),
    };

    console.log(newTask)

    if (newTask.task.trim()) {
      this.tasks.update(tasks => [...tasks, newTask])
      console.log(this.tasks())
      this.resetForm()
    }
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  completeTask(id: number) {
    const toComplete = this.tasks().find(task => task.id === id)

    if (!toComplete) return;

    this.completed.update(completed => [...completed, toComplete]);
    this.deleteTask(id)
  }

  deleteCompleted(id: number) {
    this.completed.update(completed => completed.filter(task => task.id !== id))
  }
}
